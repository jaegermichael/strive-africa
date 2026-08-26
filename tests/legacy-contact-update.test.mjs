import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = path => readFile(new URL(path, root), "utf8");

test("adds the approved South Africa office and email across the visible contact area and grounded adviser", async () => {
  const [page, layout, knowledgeBase, idealAnswers] = await Promise.all([
    read("app/page.tsx"), read("app/layout.tsx"), read("worker/knowledgeBase.js"), read("worker/idealAnswers.js"),
  ]);
  for (const content of [page, layout, knowledgeBase, idealAnswers]) {
    assert.match(content, /Number 5 Benmore Gardens/);
    assert.match(content, /batsirai@striveafriqa\.com/);
  }
  assert.match(page, /GAUTENG · SOUTH AFRICA/);
  assert.match(layout, /addressCountry: "ZA"/);
});
