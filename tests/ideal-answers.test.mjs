import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { findIdealAnswer, idealAnswerPatterns } from "../worker/idealAnswers.js";

test("returns approved ideal answers for clear supplied question-bank patterns", () => {
  const office = findIdealAnswer("Where is your study abroad office in Harare?");
  const work = findIdealAnswer("Can Zimbabwean students work while studying in Poland?");
  const oLevels = findIdealAnswer("Can I study abroad with O-Levels only?");
  const tuition = findIdealAnswer("How much does it cost to study in Malaysia?");
  const visa = findIdealAnswer("Do you guarantee visas?");

  assert.equal(office?.id, "office-and-contact");
  assert.match(office?.answer ?? "", /Office 35, 6 Chelmsford Road, Belgravia, Harare/);
  assert.equal(work?.id, "work-rights-and-poststudy");
  assert.match(work?.answer ?? "", /depend on current immigration rules/i);
  assert.equal(oLevels?.id, "olevel-pathways");
  assert.match(oLevels?.answer ?? "", /depends on your full subjects, grades, course and institution/i);
  assert.equal(tuition?.id, "tuition-scholarships-refunds");
  assert.match(tuition?.answer ?? "", /tuition only/i);
  assert.equal(visa?.id, "no-guarantees");
  assert.match(visa?.answer ?? "", /cannot guarantee either outcome/i);
});

test("keeps ideal answers free of fabricated ratings and promises", () => {
  assert.ok(idealAnswerPatterns.length >= 20);
  for (const pattern of idealAnswerPatterns) {
    assert.doesNotMatch(pattern.answer, /★★★★★|5\/5|guaranteed visa|guaranteed admission/i, pattern.id);
  }
});

test("uses the ideal-answer bank in both Worker and Vercel chat paths", async () => {
  const [worker, vercel] = await Promise.all([
    readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/chat/stream/route.ts", import.meta.url), "utf8"),
  ]);

  for (const source of [worker, vercel]) {
    assert.match(source, /import \{ findIdealAnswer \}/);
    assert.match(source, /const idealAnswer = findIdealAnswer\(latest\.content\)/);
    assert.ok(source.indexOf("else if (idealAnswer)") < source.indexOf("env.GEMINI_API_KEY") || source.indexOf("else if (idealAnswer)") < source.indexOf("const apiKey = process.env.GEMINI_API_KEY"));
  }
});
