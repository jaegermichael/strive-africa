export function isExplicitFullCatalogueRequest(query) {
  return /\b(show|list|display|view)\b/i.test(query)
    && /\b(all|every)\b/i.test(query)
    && /\b(courses?|programmes?|programs?|options)\b/i.test(query);
}

export function fullCatalogueReply(count, country) {
  const label = country ? ` in ${country}` : "";
  return `I found ${count} approved programme ${count === 1 ? "option" : "options"}${label} in the Strive catalogue. Open “Matching programme options” to view all ${count} records. Please verify current fees, intakes, entry requirements and availability with Strive before applying.`;
}
