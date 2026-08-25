import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps the dedicated testimonial area limited to verified feedback", async () => {
  const component = await readFile(new URL("../app/components/VerifiedTestimonials.tsx", import.meta.url), "utf8");

  assert.match(component, /const verifiedTestimonials: VerifiedTestimonial\[\] = \[\];/);
  assert.match(component, /only after confirming the student, the wording, and permission to share it/);
  assert.match(component, /does not publish invented ratings, anonymous claims, or unconfirmed student feedback/);
  assert.doesNotMatch(component, /★★★★★|5\/5|five-star|five star/i);
});

test("places the dedicated testimonials section before the FAQ", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /import VerifiedTestimonials from "\.\/components\/VerifiedTestimonials"/);
  assert.ok(page.indexOf("<VerifiedTestimonials/>") < page.indexOf('<section className="faq"'));
});
