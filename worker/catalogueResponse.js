export function isExplicitFullCatalogueRequest(query) {
  return /\b(show|list|display|view)\b/i.test(query)
    && /\b(all|every)\b/i.test(query)
    && /\b(courses?|programmes?|programs?|options)\b/i.test(query);
}

export function isCountryTotalQuestion(query) {
  if (/\b(visa|document|service|university|college|fee|cost|student)\b/i.test(query)) return false;
  return /\bhow many\s+total\b/i.test(query)
    || /\bhow many(?:\s+\w+){0,3}\s+(courses?|programmes?|programs?|options)\b/i.test(query)
    || /\b(total|number|count)\b/i.test(query) && /\b(courses?|programmes?|programs?|options)\b/i.test(query);
}

export function isCatalogueSearchQuestion(query) {
  return isExplicitFullCatalogueRequest(query)
    || isCountryTotalQuestion(query)
    || /\b(courses?|programmes?|programs?|options|university|universities|college|tuition|fees?|cost|budget|study|studying|degree|diploma|foundation|bachelors?|masters?|mba|medicine|medical|engineering|business|technology|it)\b/i.test(query);
}

export function fullCatalogueReply(count, country) {
  const label = country ? ` in ${country}` : "";
  return `I found ${count} approved programme ${count === 1 ? "option" : "options"}${label} in the Strive catalogue. Open “Matching programme options” to view all ${count} records. Please verify current fees, intakes, entry requirements and availability with Strive before applying.`;
}
