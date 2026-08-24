import test from "node:test";
import assert from "node:assert/strict";
import { describeGeminiPayload, extractGeminiTexts } from "../worker/geminiSse.js";

test("extracts text from Gemini streamGenerateContent array frames", () => {
  const payload = [
    { candidates: [{ content: { parts: [{ text: "Strive Africa is at " }] } }] },
    { candidates: [{ content: { parts: [{ text: "6 Chelmsford Road, Office 35, Belgravia, Harare." }] } }] },
  ];

  assert.deepEqual(extractGeminiTexts(payload), [
    "Strive Africa is at ",
    "6 Chelmsford Road, Office 35, Belgravia, Harare.",
  ]);
});

test("extracts text from a single Gemini stream frame", () => {
  const payload = { candidates: [{ content: { parts: [{ text: "Verify details with Strive." }] } }] };
  assert.deepEqual(extractGeminiTexts(payload), ["Verify details with Strive."]);
});

test("redacts Gemini response text from the empty-answer diagnostic shape", () => {
  const payload = { candidates: [{ content: { parts: [{ text: "Do not log this generated text." }] }, finishReason: "STOP" }] };
  const diagnostic = describeGeminiPayload(payload);

  assert.equal(JSON.stringify(diagnostic).includes("Do not log this generated text."), false);
  assert.deepEqual(diagnostic.frames[0].candidates[0].partKeys, [["text"]]);
});
