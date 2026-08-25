import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("lists study destinations alphabetically in the programme finder", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const match = page.match(/const countries=\[(.*?)\];/);

  assert.ok(match, "The programme finder country list should be present.");
  const countries = JSON.parse(`[${match[1]}]`);
  assert.deepEqual(countries, [...countries].sort((first, second) => first.localeCompare(second)));
  assert.equal(countries.length, 19);
});
