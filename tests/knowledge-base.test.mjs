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

test("retrieves the audited programme-finder, service and study-guide content", () => {
  assert.ok(retrieveKnowledge("How do I filter the programme finder by university and level?").some(result => result.id === "programme-finder"));
  assert.ok(retrieveKnowledge("Can you help with a motivation letter and offer letter?").some(result => result.id === "applications-detail"));
  assert.ok(retrieveKnowledge("How can I request the Beyond Borders study guide?").some(result => result.id === "study-guide-and-updates"));
});

test("retrieves an approved overview for every detailed destination, including UK shorthand", () => {
  const destinations = [
    ["Russia", "russia-destination"], ["Poland", "poland-destination"], ["Mauritius", "mauritius-destination"], ["Malaysia", "malaysia-destination"], ["India", "india-destination"], ["Lithuania", "lithuania-destination"], ["Georgia", "georgia-destination"], ["Hungary", "hungary-destination"], ["Uzbekistan", "uzbekistan-destination"], ["UAE", "uae-destination"], ["Bulgaria", "bulgaria-destination"], ["France", "france-destination"], ["Greece", "greece-destination"], ["Ireland", "ireland-destination"], ["Germany", "germany-destination"], ["Australia", "australia-destination"], ["UK", "united-kingdom-destination"], ["Canada", "canada-destination"], ["Spain", "spain-destination"],
  ];

  for (const [destination, id] of destinations) {
    const results = retrieveKnowledge(`Tell me about studying in ${destination}`);
    assert.ok(results.some(result => result.id === id), `${destination} should retrieve ${id}`);
  }
});
