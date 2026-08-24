import rawProgrammes from "../../../data/programs.json";
import { formatKnowledgeContext, retrieveKnowledge } from "../../../../worker/knowledgeBase.js";
import { describeGeminiPayload, extractGeminiTexts } from "../../../../worker/geminiSse.js";
import { fullCatalogueReply, isCatalogueSearchQuestion, isCountryTotalQuestion, isExplicitFullCatalogueRequest } from "../../../../worker/catalogueResponse.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Programme = { id: string; country: string; level: string; program: string; university: string; fee: number; currency: string; duration: string; durationLabel: string };
type ChatMessage = { role: "user" | "assistant"; content: string };

const programmes = rawProgrammes as Programme[];
const WA_NUMBER = "263716730064";
const WA_DISPLAY = "+263 71 673 0064";
const encoder = new TextEncoder();
const replyHeaders = { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform" };
const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const isGreeting = (value: string) => /^(hi|hello|hey|good (morning|afternoon|evening)|how are you)[!?. ]*$/i.test(value.trim());
const writeEvent = (writer: WritableStreamDefaultWriter<Uint8Array>, event: string, data: unknown) => writer.write(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));

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

function systemInstruction(matches: Programme[], knowledge: Array<{ title: string; text: string }>) {
  return `You are the Strive Africa Programme Adviser. Answer only from the approved knowledge-base passages and retrieved programme records below. Never use web search or external programme sources. Never invent, estimate or alter fees, deadlines, entry requirements, scholarships, availability, programme duration, visa outcomes or admissions outcomes. Immigration authorities make visa decisions. If information is unavailable, state that clearly and recommend confirmation with Strive. Before a visitor applies, remind them to verify current fees, intakes, requirements and availability with Strive. Do not ask for passports, transcripts, financial documents, passwords or sensitive files in chat. When multiple programmes are retrieved, state the number and direct the visitor to the matching-programme options rather than listing every record. The five service names must be exactly: placements, applications, career guidance, visa centre, and flight bookings. Contact number: ${WA_DISPLAY}.

CONVERSATION STYLE:
Sound like a warm, thoughtful Strive adviser speaking one-to-one, not a scripted FAQ. Start with a brief natural acknowledgement when it fits, then answer the visitor’s actual question directly in clear, reassuring language. Prefer short paragraphs and practical next steps over long lists. Use only the visitor’s stated goals; do not pretend to know their circumstances or share personal experience. When the approved records cannot determine the best option, ask at most one gentle, low-pressure follow-up question such as their preferred destination, study level, subject or budget. Do not ask a follow-up when a direct answer is available. Treat every safety boundary as a calm explanation, never as a legalistic refusal. Do not claim that you have checked live availability, contacted Strive, or completed an application.

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
      console.error("Strive Gemini upstream failure", { model, status: response.status });
      throw new Error(`Gemini request failed with ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let answer = "";
    const responseShapes: Array<ReturnType<typeof describeGeminiPayload>> = [];
    const consumeEvent = async (event: string) => {
      const data = event.split(/\r?\n/).filter(line => line.startsWith("data:")).map(line => line.slice(5).trimStart()).join("\n").trim();
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
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  let body: { sessionId?: string; messages?: ChatMessage[] };
  try { body = await request.json() as { sessionId?: string; messages?: ChatMessage[] }; } catch { return new Response("Invalid request body", { status: 400 }); }
  const sessionId = body.sessionId?.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 96);
  const messages = (body.messages || []).filter(message => (message.role === "user" || message.role === "assistant") && typeof message.content === "string" && message.content.trim()).slice(-12);
  const latest = [...messages].reverse().find(message => message.role === "user");
  if (!sessionId || !latest) return new Response("A session and visitor message are required", { status: 400 });

  const stream = new TransformStream<Uint8Array, Uint8Array>();
  const writer = stream.writable.getWriter();
  void (async () => {
    const matches = isGreeting(latest.content) || !isCatalogueSearchQuestion(latest.content) ? [] : getMatches(latest.content);
    const knowledge = retrieveKnowledge(latest.content);
    await writeEvent(writer, "meta", { programmes: matches, handoff: createHandoff(latest.content), sources: knowledge.map(document => document.title) });
    try {
      if (isGreeting(latest.content)) {
        await writeEvent(writer, "token", { token: "Hi — welcome to Strive Africa. I’m here to help you explore study options at your own pace, whether you are comparing programmes, destinations, listed fees or the support Strive offers. Where would you like to start?" });
      } else if (matches.length && (isExplicitFullCatalogueRequest(latest.content) || (getCountry(latest.content) && isCountryTotalQuestion(latest.content)))) {
        await writeEvent(writer, "token", { token: fullCatalogueReply(matches.length, getCountry(latest.content)) });
      } else {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");
        await streamGemini(writer, apiKey, process.env.GEMINI_MODEL || "gemini-2.5-flash-lite", messages, matches, knowledge);
      }
      await writeEvent(writer, "done", { ok: true });
    } catch (error) {
      console.error("Strive Gemini chat failure", { message: error instanceof Error ? error.message : String(error) });
      await writeEvent(writer, "error", { message: "I could not complete that answer just now. Please continue on WhatsApp and the Strive team will help." });
    } finally {
      await writer.close();
    }
  })();
  return new Response(stream.readable, { headers: replyHeaders });
}
