import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pagePath = new URL("../app/page.tsx", import.meta.url);
const cssPath = new URL("../app/globals.css", import.meta.url);

test("places verified official social icons in the Who We Are section", async () => {
  const [page, css] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(cssPath, "utf8"),
  ]);

  const aboutStart = page.indexOf('<section className="aboutSection" id="about">');
  const aboutEnd = page.indexOf("</section>", aboutStart);
  const about = page.slice(aboutStart, aboutEnd);

  assert.ok(aboutStart >= 0, "Who We Are section should exist");
  assert.match(about, /https:\/\/www\.facebook\.com\/afriqastrive/);
  assert.match(about, /https:\/\/www\.tiktok\.com\/@striveafrica\.edu/);
  assert.match(about, /https:\/\/www\.instagram\.com\/strive_africa\?igsi=OTFqeTc0dm53NzRo/);
  assert.equal((about.match(/className="aboutSocialIdentity"/g) || []).length, 3);
  assert.match(about, /className="aboutSocialIcon facebook"/);
  assert.match(about, /className="aboutSocialIcon tiktok"/);
  assert.match(about, /className="aboutSocialIcon instagram"/);
  assert.match(css, /\.aboutSocialIcon\.facebook\{background-image:url\("https:\/\/www\.google\.com\/s2\/favicons\?domain=facebook\.com&sz=64"\)\}/);
  assert.match(css, /\.aboutSocialIcon\.tiktok\{background-image:url\("https:\/\/www\.google\.com\/s2\/favicons\?domain=tiktok\.com&sz=64"\)\}/);
  assert.match(css, /\.aboutSocialIcon\.instagram\{background-image:url\("https:\/\/www\.google\.com\/s2\/favicons\?domain=instagram\.com&sz=64"\)\}/);
});
