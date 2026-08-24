import test from "node:test";
import assert from "node:assert/strict";
import { extractGeminiTexts } from "../worker/geminiSse.js";

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
