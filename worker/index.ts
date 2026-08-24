import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import rawProgrammes from "../app/data/programs.json";
import { formatKnowledgeContext, retrieveKnowledge } from "./knowledgeBase.js";
import { describeGeminiPayload, extractGeminiTexts } from "./geminiSse.js";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

type Programme = { id: string; country: string; level: string; program: string; university: string; fee: number; currency: string; duration: string; durationLabel: string };
type ChatMessage = { role: "user" | "assistant"; content: string };
const programmes = rawProgrammes as Programme[];
const WA_NUMBER = "263716730064";
const WA_DISPLAY = "+263 71 673 0064";
const encoder = new TextEncoder();
const replyHeaders = { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive" };
const writeEvent = (writer: WritableStreamDefaultWriter<Uint8Array>, event: string, data: unknown) => writer.write(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const isGreeting = (value: string) => /^(hi|hello|hey|good (morning|afternoon|evening)|how are you)[!?. ]*$/i.test(value.trim());

function getCountry(query: string) {
  const normalised = normalise(query);
  const countries = [...new Set(programmes.map(programme => programme.country))].sort((a, b) => b.length - a.length);
  const direct = countries.find(country => normalised.includes(normalise(country)));
  if (direct) return direct;
  if (/\buae\b/i.test(query)) return "UAE";
  if (/\buk\b/i.test(query)) return "United Kingdom";
  return undefined;
}

function getLevel(query: string) {
  if (/\b(postgraduate|masters?|master's|mba)\b/i.test(query)) return "Postgraduate";
  if (/\b(undergraduate|bachelors?|bachelor's|degree)\b/i.test(query)) return "Undergraduate";
  if (/\b(diploma|foundation|certificate)\b/i.test(query)) return "Diploma / Foundation";
  return undefined;
}

function getBudget(query: string) {
  const match = query.match(/(?:under|below|less than|maximum|max|budget(?:\s+of)?)[^\d$€]{0,16}([$€])?\s*(\d[\d,]*(?:\.\d+)?)(?:\s*(usd|eur))?/i);
  if (!match) return undefined;
  const amount = Number(match[2].replace(/,/g, ""));
  if (!Number.isFinite(amount)) return undefined;
  const currency = match[1] === "$" || match[3]?.toLowerCase() === "usd" ? "USD" : match[1] === "€" || match[3]?.toLowerCase() === "eur" ? "EUR" : undefined;
  return { amount, currency };
}

function getMatches(query: string) {
  const country = getCountry(query);
  const level = getLevel(query);
  const budget = getBudget(query);
  const stopWords = new Set(["show", "all", "courses", "course", "programmes", "programs", "programme", "study", "what", "which", "with", "from", "about", "help", "find"]);
  const terms = normalise(query).split(" ").filter(term => term.length > 2 && !stopWords.has(term));
  const base = programmes.filter(programme => (!country || programme.country === country) && (!level || programme.level === level) && (!budget?.currency || programme.currency === budget.currency) && (!budget || programme.fee <= budget.amount));
  const ranked = base.map(programme => ({ programme, score: terms.reduce((score, term) => score + (normalise(`${programme.program} ${programme.university} ${programme.country}`).includes(term) ? 1 : 0), 0) })).sort((a, b) => b.score - a.score || a.programme.fee - b.programme.fee);
  return (terms.length ? ranked.filter(result => result.score > 0) : ranked).map(result => result.programme);
}

const createHandoff = (question: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hello Strive, I would like help with my study-abroad options. My question: ${question}`)}`;

async function logMessage(db: D1Database, sessionId: string, role: "user" | "assistant", content: string) {
  try { await db.prepare("INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)").bind(sessionId, role, content).run(); } catch { /* Chat stays available when migration is pending. */ }
}

function systemInstruction(matches: Programme[], knowledge: Array<{ title: string; text: string }>) {
  return `You are the Strive Africa Programme Adviser. Answer only from the approved knowledge-base passages and retrieved programme records below. Never use web search or external programme sources. Never invent, estimate or alter fees, deadlines, entry requirements, scholarships, availability, programme duration, visa outcomes or admissions outcomes. Immigration authorities make visa decisions. If information is unavailable, state that clearly and recommend confirmation with Strive. Before a visitor applies, remind them to verify current fees, intakes, requirements and availability with Strive. Do not ask for passports, transcripts, financial documents, passwords or sensitive files in chat. When multiple programmes are retrieved, state the number and direct the visitor to the matching-programme options rather than listing every record. The five service names must be exactly: placements, applications, career guidance, visa centre, and flight bookings. Contact number: ${WA_DISPLAY}.

APPROVED KNOWLEDGE BASE:
${formatKnowledgeContext(knowledge) || "No topical passage was needed; respond only with the safety boundary and WhatsApp handoff."}

RETRIEVED PROGRAMME RECORDS:
${JSON.stringify(matches)}`;
}

async function streamGemini(writer: WritableStreamDefaultWriter<Uint8Array>, apiKey: string, model: string, messages: ChatMessage[], matches: Programme[], knowledge: Array<{ title: string; text: string }>) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction(matches, knowledge) }] },
        contents: messages.slice(-10).map(message => ({ role: message.role === "assistant" ? "model" : "user", parts: [{ text: message.content }] })),
        generationConfig: { temperature: 0.2, maxOutputTokens: 1000 },
      }),
      signal: controller.signal,
    });
    if (!response.ok || !response.body) {
      const message = `Gemini request failed with ${response.status}`;
      console.error("Strive Gemini upstream failure", { model, status: response.status });
      throw new Error(message);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let answer = "";
    const responseShapes: Array<ReturnType<typeof describeGeminiPayload>> = [];
    const consumeEvent = async (event: string) => {
      const data = event
        .split(/\r?\n/)
        .filter(line => line.startsWith("data:"))
        .map(line => line.slice(5).trimStart())
        .join("\n")
        .trim();
      if (!data || data === "[DONE]") return;
      try {
        const payload = JSON.parse(data);
        responseShapes.push(describeGeminiPayload(payload));
        for (const text of extractGeminiTexts(payload)) {
          answer += text;
          await writeEvent(writer, "token", { token: text });
        }
      } catch { /* Ignore non-text provider frames. */ }
    };
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split(/\r?\n\r?\n/);
      buffer = events.pop() || "";
      for (const event of events) await consumeEvent(event);
    }
    if (buffer.trim()) await consumeEvent(buffer);
    if (!answer.trim()) {
      console.error("Strive Gemini returned no text", { model, responseShapes: responseShapes.slice(0, 3) });
      throw new Error("Gemini returned no text");
    }
    return answer.trim();
  } catch (error) {
    if (controller.signal.aborted) {
      console.error("Strive Gemini upstream timeout", { model, timeoutMs: 20_000 });
      throw new Error("Gemini request timed out after 20 seconds");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function handleChat(request: Request, env: Env, ctx: ExecutionContext) {
  if (request.method === "OPTIONS") return new Response(null, { headers: { ...replyHeaders, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  let body: { sessionId?: string; messages?: ChatMessage[] };
  try { body = await request.json() as { sessionId?: string; messages?: ChatMessage[] }; } catch { return new Response("Invalid request body", { status: 400 }); }
  const sessionId = body.sessionId?.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 96);
  const messages = (body.messages || []).filter(message => (message.role === "user" || message.role === "assistant") && typeof message.content === "string" && message.content.trim()).slice(-12);
  const latest = [...messages].reverse().find(message => message.role === "user");
  if (!sessionId || !latest) return new Response("A session and visitor message are required", { status: 400 });

  const stream = new TransformStream<Uint8Array, Uint8Array>();
  const writer = stream.writable.getWriter();
  ctx.waitUntil((async () => {
    const matches = isGreeting(latest.content) ? [] : getMatches(latest.content);
    const knowledge = retrieveKnowledge(latest.content);
    await logMessage(env.DB, sessionId, "user", latest.content);
    await writeEvent(writer, "meta", { programmes: matches, handoff: createHandoff(latest.content), sources: knowledge.map(document => document.title) });
    let answer = "";
    try {
      if (isGreeting(latest.content)) {
        answer = "Hello, welcome to Strive Africa. I can help with programmes, destinations, approved listed fees, applications, career guidance, visa centre, flight bookings, student journeys, the study guide and contact details. What would you like to know?";
        await writeEvent(writer, "token", { token: answer });
      } else if (env.GEMINI_API_KEY) {
        answer = await streamGemini(writer, env.GEMINI_API_KEY, env.GEMINI_MODEL || "gemini-2.5-flash-lite", messages, matches, knowledge);
      } else {
        answer = matches.length ? `I found ${matches.length} approved programme match${matches.length === 1 ? "" : "es"} in the Strive catalogue. Open “Matching programme options” to explore them, then verify current fees, intakes, entry requirements and availability with Strive before applying.` : `I can help with Strive’s approved programme catalogue and site information. To enable Gemini-powered answers, configure the server-side GEMINI_API_KEY secret; you can also continue with Strive on WhatsApp at ${WA_DISPLAY}.`;
        await writeEvent(writer, "token", { token: answer });
      }
      if (answer) await logMessage(env.DB, sessionId, "assistant", answer);
      await writeEvent(writer, "done", { ok: true });
    } catch (error) {
      console.error("Strive Gemini chat failure", {
        message: error instanceof Error ? error.message : String(error),
      });
      await writeEvent(writer, "error", { message: "I could not complete that answer just now. Please continue on WhatsApp and the Strive team will help." });
    } finally { await writer.close(); }
  })());
  return new Response(stream.readable, { headers: replyHeaders });
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, { fetchAsset: path => env.ASSETS.fetch(new Request(new URL(path, request.url))), transformImage: async (body, { width, format, quality }) => (await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality })).response() }, allowedWidths);
    }
    if (url.pathname === "/api/chat/stream") return handleChat(request, env, ctx);
    return handler.fetch(request, env, ctx);
  },
};

export default worker;
