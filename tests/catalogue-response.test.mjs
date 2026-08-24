import test from "node:test";
import assert from "node:assert/strict";
import { fullCatalogueReply, isCountryTotalQuestion, isExplicitFullCatalogueRequest } from "../worker/catalogueResponse.js";

test("recognises an explicit complete catalogue request", () => {
  assert.equal(isExplicitFullCatalogueRequest("Show all courses in Russia."), true);
  assert.equal(isExplicitFullCatalogueRequest("Can you help me choose a course?"), false);
});

test("recognises country total questions that must use verified catalogue counts", () => {
  assert.equal(isCountryTotalQuestion("how many total are in Malaysia"), true);
  assert.equal(isCountryTotalQuestion("How many courses are in Malaysia?"), true);
  assert.equal(isCountryTotalQuestion("Help me choose a university"), false);
});

test("uses the verified catalogue count in the complete-catalogue reply", () => {
  const reply = fullCatalogueReply(89, "Russia");
  assert.match(reply, /89 approved programme options in Russia/);
  assert.match(reply, /view all 89 records/);
});
