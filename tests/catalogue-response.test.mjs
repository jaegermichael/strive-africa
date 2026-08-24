import test from "node:test";
import assert from "node:assert/strict";
import { fullCatalogueReply, isExplicitFullCatalogueRequest } from "../worker/catalogueResponse.js";

test("recognises an explicit complete catalogue request", () => {
  assert.equal(isExplicitFullCatalogueRequest("Show all courses in Russia."), true);
  assert.equal(isExplicitFullCatalogueRequest("Can you help me choose a course?"), false);
});

test("uses the verified catalogue count in the complete-catalogue reply", () => {
  const reply = fullCatalogueReply(89, "Russia");
  assert.match(reply, /89 approved programme options in Russia/);
  assert.match(reply, /view all 89 records/);
});
