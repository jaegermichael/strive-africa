import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = path => readFile(new URL(path, root), "utf8");

test("defines a concise canonical homepage title and description for qualified Zimbabwe study-abroad searches", async () => {
  const layout = await read("app/layout.tsx");
  assert.match(layout, /https:\/\/www\.africastrive\.com/);
  assert.match(layout, /Study Abroad Consultants in Harare, Zimbabwe \| Strive Africa/);
  assert.match(layout, /Study abroad from Zimbabwe with Strive Africa/);
  assert.match(layout, /alternates: \{ canonical: "\/" \}/);
  assert.doesNotMatch(layout, /best study abroad agency|trusted study abroad agents/i);
});

test("publishes only visible, supportable organization and FAQ structured data", async () => {
  const layout = await read("app/layout.tsx");
  assert.match(layout, /"@type": "EducationalOrganization"/);
  assert.match(layout, /Office 35, 6 Chelmsford Road, Belgravia/);
  assert.match(layout, /"@type": "FAQPage"/);
  assert.match(layout, /Are these fees final\?/);
  assert.match(layout, /application\/ld\+json/);
  assert.doesNotMatch(layout, /AggregateRating|Review|ratingValue/);
});

test("exposes crawlable robots and sitemap routes for the canonical public domain", async () => {
  const [robots, sitemap] = await Promise.all([read("app/robots.ts"), read("app/sitemap.ts")]);
  assert.match(robots, /allow: "\/"/);
  assert.match(robots, /https:\/\/www\.africastrive\.com\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/www\.africastrive\.com\//);
});

test("uses high-intent terms naturally in visible homepage copy without keyword stuffing", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /Study abroad from Zimbabwe/);
  assert.match(page, /Harare-based university placement/);
  assert.match(page, /personal study-abroad consultation in Harare or on WhatsApp/);
  assert.match(page, /Strive’s study-abroad consultants in Belgravia, Harare/);
});
