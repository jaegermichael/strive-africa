import assert from "node:assert/strict";
import test from "node:test";
import { retrieveKnowledge } from "../worker/knowledgeBase.js";

test("retrieves approved visa guidance and its safety boundary", () => {
  const results = retrieveKnowledge("Can Strive guarantee my student visa?");
  assert.ok(results.some(result => result.id === "services"));
  assert.ok(results.some(result => result.id === "safety"));
});

test("retrieves contact knowledge from an office question", () => {
  const results = retrieveKnowledge("Where is the Strive office in Harare?");
  assert.equal(results[0]?.id, "contact");
});
