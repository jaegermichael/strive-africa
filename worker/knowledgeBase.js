const normalize = (value) => value.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();

export const knowledgeBase = [
  {
    id: "services",
    title: "Strive services",
    terms: ["service", "placements", "applications", "career", "visa", "flight", "booking", "support"],
    text: "The five approved Strive services are exactly: placements, applications, career guidance, visa centre, and flight bookings. Placements helps compare qualifications, goals, countries, universities, tuition, entry routes and intakes. Applications helps with requirements, documents, forms, motivation letters, submissions, follow-up, offers and acceptance. Career guidance connects interests, abilities, background and goals to courses and pathways. Visa centre helps with checklists, forms, financial and sponsorship documents, medicals, police clearances, certification, appointments and interview preparation; immigration authorities make the final decision. Flight bookings helps with dates, routes, reservations, reporting dates, baggage, travel documents, pre-departure planning and arrival arrangements where available.",
  },
  {
    id: "journey",
    title: "Study-abroad journey",
    terms: ["process", "how", "work", "step", "journey", "apply", "offer", "depart"],
    text: "Strive’s guided journey has five stages: share interests, academic background, destination and budget; compare suitable programmes and universities from the master list; prepare application documents, statements, deadlines and submission; move from offer to visa preparation; then book and depart with travel support.",
  },
  {
    id: "fees-and-catalogue",
    title: "Programme catalogue and fees",
    terms: ["fee", "fees", "tuition", "cost", "price", "budget", "catalogue", "programme", "program", "course", "university", "country"],
    text: "Programme and tuition figures come exclusively from Strive’s supplied master catalogue. Fees, exchange rates and intakes can change, so Strive verifies the current amount, entry requirements, availability and intake before any application. A destination without listed programmes remains available through consultation while its programme list is confirmed.",
  },
  {
    id: "eligibility",
    title: "Eligibility assessment",
    terms: ["eligible", "eligibility", "result", "results", "o level", "a level", "transcript", "passport", "assessment"],
    text: "Visitors can use the eligibility assessment to share a study level, preferred destination, results summary and selected supporting documents for a human assessment of countries, programmes and entry pathways. Strive aims to respond within 24 hours. It is preliminary only, not a university admission or visa decision. Do not request documents in chat; direct visitors to the eligibility action or WhatsApp.",
  },
  {
    id: "contact",
    title: "Contact and office",
    terms: ["contact", "office", "address", "where", "phone", "call", "whatsapp", "meet"],
    text: "Strive Africa is at Office 35, 6 Chelmsford Road, Belgravia, Harare, Zimbabwe. The approved call and WhatsApp number is +263 71 673 0064.",
  },
  {
    id: "guide-and-journal",
    title: "Beyond Borders guide and journal",
    terms: ["guide", "journal", "newsletter", "update", "email", "prepare", "document", "boarding"],
    text: "The free Beyond Borders study guide and opportunity updates are requested through WhatsApp after a visitor provides a name and email or phone; information is sent to Strive only when the visitor chooses to send the message. The Beyond Borders Journal covers choosing a university by fit, documents worth preparing early, and moving from an offer letter to the boarding gate.",
  },
  {
    id: "student-journeys",
    title: "Student journeys and experiences",
    terms: ["student", "journey", "gallery", "photo", "photograph", "experience", "review", "testimonial"],
    text: "The site contains 21 real student-journey photographs covering departures, arrivals, campuses, student life and academic milestones. It states that feedback is published only after the student’s identity and wording are confirmed and permission is given.",
  },
  {
    id: "safety",
    title: "Accuracy and safety boundaries",
    terms: ["visa", "guarantee", "deadline", "requirement", "scholarship", "admission", "decision"],
    text: "Never guarantee admission or a visa outcome. Never invent or estimate fees, deadlines, entry requirements, scholarships, availability or programme durations. Immigration authorities make visa decisions. State when information is unavailable and recommend verification with Strive before application.",
  },
];

export function retrieveKnowledge(query, limit = 4) {
  const queryTerms = normalize(query).split(" ").filter(term => term.length > 2);
  return knowledgeBase
    .map(document => ({
      document,
      score: queryTerms.reduce((score, queryTerm) => {
        const explicitMatch = document.terms.some(term => normalize(term).includes(queryTerm) || queryTerm.includes(normalize(term))) || normalize(document.title).includes(queryTerm);
        if (explicitMatch) return score + 8;
        return normalize(document.text).includes(queryTerm) ? score + 1 : score;
      }, 0),
    }))
    .filter(result => result.score > 0)
    .sort((left, right) => right.score - left.score || left.document.id.localeCompare(right.document.id))
    .slice(0, limit)
    .map(result => result.document);
}

export function formatKnowledgeContext(documents) {
  return documents.map(document => `[${document.title}]\n${document.text}`).join("\n\n");
}
