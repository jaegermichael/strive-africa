import test from "node:test";
import assert from "node:assert/strict";
import { alphabeticalProgrammeOrder, fullCatalogueReply, isCatalogueSearchQuestion, isCountryTotalQuestion, isExplicitFullCatalogueRequest, requestsNoProgrammeOptions } from "../worker/catalogueResponse.js";

test("recognises an explicit complete catalogue request", () => {
  assert.equal(isExplicitFullCatalogueRequest("Show all courses in Russia."), true);
  assert.equal(isExplicitFullCatalogueRequest("Can you help me choose a course?"), false);
});

test("recognises country total questions that must use verified catalogue counts", () => {
  assert.equal(isCountryTotalQuestion("how many total are in Malaysia"), true);
  assert.equal(isCountryTotalQuestion("How many courses are in Malaysia?"), true);
  assert.equal(isCountryTotalQuestion("How many visa documents are needed in Malaysia?"), false);
  assert.equal(isCountryTotalQuestion("Help me choose a university"), false);
});

test("only searches the catalogue for catalogue-focused questions", () => {
  assert.equal(isCatalogueSearchQuestion("Can Strive help with a motivation letter and explain my offer letter?"), false);
  assert.equal(isCatalogueSearchQuestion("Give me an overview of studying in Uzbekistan and its currency."), false);
  assert.equal(isCatalogueSearchQuestion("Can I send medical documents in this chat for a Malaysian intake?"), false);
  assert.equal(isCatalogueSearchQuestion("Give me an overview of studying in Uzbekistan, but do not show programme options."), false);
  assert.equal(isCatalogueSearchQuestion("What courses can I study in Malaysia?"), true);
  assert.equal(isCatalogueSearchQuestion("how many total are in Malaysia"), true);
});

test("recognises an explicit request to omit programme options", () => {
  assert.equal(requestsNoProgrammeOptions("Do not show programme options."), true);
  assert.equal(requestsNoProgrammeOptions("Give me the Uzbekistan overview without listing courses."), true);
  assert.equal(requestsNoProgrammeOptions("Show programme options in Uzbekistan."), false);
});

test("orders matching programme cards alphabetically by programme, university, level and country", () => {
  const ordered = alphabeticalProgrammeOrder([
    { program: "Medicine", university: "Zeta University", level: "Undergraduate", country: "Russia" },
    { program: "Accounting", university: "Beta University", level: "Postgraduate", country: "Malaysia" },
    { program: "Medicine", university: "Alpha University", level: "Postgraduate", country: "Russia" },
  ]);
  assert.deepEqual(ordered.map(programme => `${programme.program}|${programme.university}`), ["Accounting|Beta University", "Medicine|Alpha University", "Medicine|Zeta University"]);
});

test("uses the verified catalogue count in the complete-catalogue reply", () => {
  const reply = fullCatalogueReply(89, "Russia");
  assert.match(reply, /89 programme options in Russia/);
  assert.match(reply, /view all 89 records/);
  assert.match(reply, /help you narrow the list down/);
});
