export function isExplicitFullCatalogueRequest(query) {
  return /\b(show|list|display|view)\b/i.test(query)
    && /\b(all|every)\b/i.test(query)
    && /\b(courses?|programmes?|programs?|options)\b/i.test(query);
}

export function isCountryTotalQuestion(query) {
  if (/\b(visa|document|service|admission|application|passport|financial|medical)\b/i.test(query)) return false;
  return /\bhow many\s+total\b/i.test(query)
    || /\bhow many(?:\s+\w+){0,3}\s+(courses?|programmes?|programs?|options)\b/i.test(query)
    || /\b(total|number|count)\b/i.test(query) && /\b(courses?|programmes?|programs?|options)\b/i.test(query);
}

export function isCatalogueSearchQuestion(query) {
  if (/\b(visa|passport|documents?|financial|medical|police clearance|interview|admission|eligibility|assessment)\b/i.test(query)) return false;
  return isExplicitFullCatalogueRequest(query)
    || isCountryTotalQuestion(query)
    || /\b(courses?|programmes?|programs?|options|university|universities|college|tuition|fees?|cost|budget|degree|diploma|foundation|bachelors?|masters?|mba|medicine|engineering|business|technology|it)\b/i.test(query);
}

export function alphabeticalProgrammeOrder(programmes) {
  return [...programmes].sort((left, right) =>
    left.program.localeCompare(right.program, undefined, { sensitivity: "base", numeric: true })
    || left.university.localeCompare(right.university, undefined, { sensitivity: "base", numeric: true })
    || left.level.localeCompare(right.level, undefined, { sensitivity: "base", numeric: true })
    || left.country.localeCompare(right.country, undefined, { sensitivity: "base", numeric: true })
  );
}

export function fullCatalogueReply(count, country) {
  const label = country ? ` in ${country}` : "";
  return `I found ${count} approved programme ${count === 1 ? "option" : "options"}${label} in the Strive catalogue. Open “Matching programme options” to view all ${count} records. Please verify current fees, intakes, entry requirements and availability with Strive before applying.`;
}
