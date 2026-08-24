import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const cssPath = new URL("../app/globals.css", import.meta.url);
const sourcePaths = [
  new URL("../app/page.tsx", import.meta.url),
  new URL("../app/components/StriveFloatingChat.tsx", import.meta.url),
];

test("keeps responsive layouts protected at tablet and mobile widths", async () => {
  const css = await readFile(cssPath, "utf8");

  assert.match(css, /html,body\{max-width:100%;overflow-x:clip\}/);
  assert.match(css, /@media\(max-width:980px\)\{[^}]*\.siteHeader/);
  assert.match(css, /@media\(max-width:980px\)[\s\S]*?\.hero\{grid-template-columns:minmax\(0,1fr\)/);
  assert.match(css, /@media\(max-width:980px\)[\s\S]*?\.serviceGrid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /@media\(max-width:720px\)[\s\S]*?\.destinationList\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /safe-area-inset-bottom/);
});

test("keeps visitor-facing application source free of emoji characters", async () => {
  const sources = await Promise.all(sourcePaths.map(path => readFile(path, "utf8")));
  const emoji = /[\u{1F000}-\u{1FAFF}]/u;

  for (const source of sources) {
    assert.equal(emoji.test(source), false);
  }
});
