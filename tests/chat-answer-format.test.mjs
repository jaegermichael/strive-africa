import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const paths = [
  new URL("../worker/index.ts", import.meta.url),
  new URL("../app/api/chat/stream/route.ts", import.meta.url),
];

test("keeps Worker and Vercel adviser answer-format instructions aligned", async () => {
  const [worker, vercel] = await Promise.all(paths.map(path => readFile(path, "utf8")));
  const requiredPhrases = [
    "first give a direct answer in one or two sentences",
    "add no more than two brief, verified practical details",
    "Do not use a long process list unless the visitor explicitly asks how the process works",
    "Country-specific work rights, student work-hour limits, visa rules, bank-balance rules, scholarships, safety rules and admission requirements are unavailable",
    "Do not infer or guess them",
    "living costs, visa costs, insurance, flights and other charges are separate",
  ];

  for (const phrase of requiredPhrases) {
    assert.ok(worker.includes(phrase), `Worker is missing: ${phrase}`);
    assert.ok(vercel.includes(phrase), `Vercel route is missing: ${phrase}`);
  }
});
