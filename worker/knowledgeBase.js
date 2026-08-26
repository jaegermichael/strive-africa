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
    terms: ["contact", "office", "address", "where", "phone", "call", "whatsapp", "email", "meet", "south africa", "gauteng"],
    text: "Strive Africa has offices at Office 35, 6 Chelmsford Road, Belgravia, Harare, Zimbabwe, and Number 5 Benmore Gardens, Corworx, Gauteng, South Africa. The approved call and WhatsApp number is +263 71 673 0064, and the email address is batsirai@striveafriqa.com.",
  },
  {
    id: "company-story-and-socials",
    title: "Who Strive is and where to follow",
    terms: ["who are you", "about", "company", "strivio", "nexafriqa", "director", "facebook", "instagram", "tiktok", "social", "follow"],
    text: "The website identifies Strivio Education Solutions as a Zimbabwe-based education consultancy that connects students with international study opportunities. It says its directors bring industry experience and international exposure, and that Strivio supports Southern African student recruitment as a supplier to Nexafriqa (Pty) Ltd in South Africa. Official social links on the website are Facebook (facebook.com/afriqastrive), TikTok (@striveafrica.edu) and Instagram (@strive_africa).",
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
  {
    id: "programme-finder",
    title: "Programme finder and master catalogue",
    terms: ["finder", "search", "filter", "shortlist", "listed", "master list", "all courses", "all programmes", "detailed destinations"],
    text: "The website programme finder searches Strive’s supplied master catalogue by programme, country, university and study level. The detailed destinations are Russia, Poland, Mauritius, Malaysia, India, Lithuania, Georgia, Hungary, Uzbekistan, UAE, Bulgaria, France, Greece, Ireland, Germany, Australia, United Kingdom, Canada and Spain. Programme records may show study level, university, tuition figure, currency and duration when these fields are in the supplied catalogue. The chat must use retrieved records for catalogue facts and must not create courses, universities or programme details that are absent from those records.",
  },
  {
    id: "catalogue-limits",
    title: "Catalogue figures and exclusions",
    terms: ["living costs", "insurance", "charges", "exchange rate", "tuition only", "final fee", "current fee", "currency"],
    text: "Catalogue tuition figures are tuition only. Living costs, visa costs, insurance, flights and other charges are separate. Tuition figures, exchange rates, intakes, entry requirements and availability may vary by programme, institution and intake, and must be verified with Strive before application. If no verified fee row is listed for a destination, direct the visitor to Strive for current information rather than estimating an amount.",
  },
  {
    id: "placements-detail",
    title: "University placements detail",
    terms: ["placement", "placements", "recommend", "alternative pathway", "direct entry", "choose university"],
    text: "For university placements, Strive assesses academic results, career interests, budget and personal goals before recommending study options from Foundation and Certificate routes through Bachelor’s and Master’s programmes. Its support includes reviewing qualifications; recommending suitable countries and universities; identifying programmes aligned to career goals; comparing tuition, entry requirements and intakes; considering alternative pathways when direct entry is unavailable; and helping visitors make an informed final choice. It does not promise placement or admission.",
  },
  {
    id: "applications-detail",
    title: "Application support detail",
    terms: ["application", "apply", "motivation letter", "personal statement", "offer letter", "acceptance", "submission"],
    text: "Application support covers checking university entry requirements, reviewing academic and personal documents, completing application forms, assisting with motivation letters and personal statements, submitting applications to selected institutions, following up on progress, explaining offer letters and admission conditions, and guiding tuition and acceptance procedures. Strive aims to make applications complete and professionally prepared, but the chatbot must not claim that an application will be accepted or that any requirement is final without Strive verification.",
  },
  {
    id: "career-guidance-detail",
    title: "Career guidance detail",
    terms: ["career", "interests", "abilities", "ambitions", "career opportunities", "parents"],
    text: "Career guidance discusses a visitor’s interests, abilities, ambitions and academic performance; identifies suitable career options; recommends relevant courses and qualifications; explains study pathways and potential career opportunities; and supports students and parents in making informed decisions. The adviser can describe this support but cannot guarantee a career outcome.",
  },
  {
    id: "visa-centre-detail",
    title: "Visa centre detail",
    terms: ["visa centre", "visa checklist", "sponsorship", "medical", "police clearance", "legalisation", "appointment", "interview"],
    text: "Visa centre support is tailored to the relevant embassy, immigration authority and institution requirements. It can include a personalised visa-document checklist, review of financial and sponsorship documents, form assistance, guidance about medical examinations and police clearances, certification and legalisation support, appointment preparation, interview preparation where required, review before submission, and updates throughout the process. Immigration authorities make the final decision, so neither Strive nor the chatbot can guarantee a visa or state country-specific requirements unless Strive confirms them.",
  },
  {
    id: "flight-bookings-detail",
    title: "Flight bookings detail",
    terms: ["flight", "flights", "departure", "arrival", "baggage", "airport pickup", "accommodation", "travel"],
    text: "After admission and visa preparation, flight bookings support can compare options, select practical dates and routes, assist with reservations and bookings, check university reporting and arrival dates, provide baggage and travel-document guidance, prepare a pre-departure checklist, coordinate airport pickup where available, and support accommodation and arrival arrangements. Availability of any flight or arrival service must be confirmed with Strive.",
  },
  {
    id: "study-guide-and-updates",
    title: "Study guide and opportunity updates",
    terms: ["beyond borders", "study guide", "updates", "newsletter", "reminder", "join", "email"],
    text: "Visitors can request the free Beyond Borders study guide and opportunity updates through WhatsApp. The website can prepare a WhatsApp message with a name and email or phone, but nothing is sent until the visitor chooses to send it. Updates may include programme updates, application reminders and practical study-abroad guidance from the Strive team. The chatbot should offer the WhatsApp handoff rather than collect personal contact information itself.",
  },
  {
    id: "website-faq",
    title: "Website frequently asked questions",
    terms: ["final", "no programmes", "not listed", "meet", "office", "choose a course", "fee"],
    text: "The website FAQ says that supplied master-file figures are not final because fees, exchange rates and intakes can change; Strive verifies the current amount before an application. Strive can help connect interests, academic background, budget and career direction to study pathways. A destination with no listed programmes remains available for consultation while its programme list is confirmed. Visitors can meet the team at Office 35, 6 Chelmsford Road, Belgravia, Harare, Zimbabwe, or contact +263 71 673 0064 by call or WhatsApp.",
  },
  {
    id: "russia-destination",
    title: "Russia destination overview",
    terms: ["russia", "russian", "ruble", "rub"],
    text: "Russia is presented as a broad university market with medicine, engineering, technology and other academic routes across several cities. Its local currency is the Russian ruble (RUB). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "poland-destination",
    title: "Poland destination overview",
    terms: ["poland", "polish", "złoty", "pln"],
    text: "Poland is presented as a European study destination with English-taught options and a strong selection of business, technology and health programmes. Its local currency is the Polish złoty (PLN). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "mauritius-destination",
    title: "Mauritius destination overview",
    terms: ["mauritius", "mauritian", "rupee", "mur"],
    text: "Mauritius is presented as an island study destination offering a multicultural environment and a practical regional option for African students. Its local currency is the Mauritian rupee (MUR). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "malaysia-destination",
    title: "Malaysia destination overview",
    terms: ["malaysia", "malaysian", "ringgit", "myr"],
    text: "Malaysia is presented as a diverse education hub with a wide choice of institutions, programme levels and comparatively accessible study routes. Its local currency is the Malaysian ringgit (MYR). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "india-destination",
    title: "India destination overview",
    terms: ["india", "indian", "inr"],
    text: "India is presented as a large education market with extensive course choice across technology, business, health sciences and the humanities. Its local currency is the Indian rupee (INR). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "lithuania-destination",
    title: "Lithuania destination overview",
    terms: ["lithuania", "lithuanian", "euro", "eur"],
    text: "Lithuania is presented as a compact European destination with internationally oriented programmes and pathways in business and technology. Its local currency is the Euro (EUR). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "georgia-destination",
    title: "Georgia destination overview",
    terms: ["georgia", "georgian", "lari", "gel"],
    text: "Georgia is presented as a growing study destination known for internationally accessible university options, including medical pathways. Its local currency is the Georgian lari (GEL). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "hungary-destination",
    title: "Hungary destination overview",
    terms: ["hungary", "hungarian", "forint", "huf"],
    text: "Hungary is presented as a Central European destination with established universities and English-taught routes across several disciplines. Its local currency is the Hungarian forint (HUF). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "uzbekistan-destination",
    title: "Uzbekistan destination overview",
    terms: ["uzbekistan", "uzbekistani", "som", "uzs"],
    text: "Uzbekistan is presented as an emerging destination with affordable programme options, particularly within medicine and related fields. Its local currency is the Uzbekistani soʻm (UZS). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "uae-destination",
    title: "UAE destination overview",
    terms: ["uae", "united arab emirates", "emirates", "dirham", "aed"],
    text: "The UAE is presented as a globally connected study environment with modern campuses and access to business, technology and professional networks. Its local currency is the UAE dirham (AED). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "bulgaria-destination",
    title: "Bulgaria destination overview",
    terms: ["bulgaria", "bulgarian", "lev", "bgn"],
    text: "Bulgaria is presented as a European destination offering university pathways in medicine, business, engineering and other professional fields. Its local currency is the Bulgarian lev (BGN). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "france-destination",
    title: "France destination overview",
    terms: ["france", "french", "euro", "eur"],
    text: "France is presented as a major European education centre with routes in business, arts, engineering, science and hospitality. Its local currency is the Euro (EUR). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "greece-destination",
    title: "Greece destination overview",
    terms: ["greece", "greek", "euro", "eur"],
    text: "Greece is presented as a Mediterranean study destination with a growing range of internationally taught academic programmes. Its local currency is the Euro (EUR). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "ireland-destination",
    title: "Ireland destination overview",
    terms: ["ireland", "irish", "euro", "eur"],
    text: "Ireland is presented as an English-speaking European destination with strong links to technology, business, research and global employers. Its local currency is the Euro (EUR). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "germany-destination",
    title: "Germany destination overview",
    terms: ["germany", "german", "euro", "eur"],
    text: "Germany is presented as a respected European study destination with strong engineering, technology, research and applied-science pathways. Its local currency is the Euro (EUR). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "australia-destination",
    title: "Australia destination overview",
    terms: ["australia", "australian", "aud"],
    text: "Australia is presented as a globally recognised destination with broad course choice, established student services and multicultural cities. Its local currency is the Australian dollar (AUD). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "united-kingdom-destination",
    title: "United Kingdom destination overview",
    terms: ["united kingdom", "uk", "britain", "british", "pound", "sterling", "gbp"],
    text: "The United Kingdom is presented as a well-established study destination offering globally recognised qualifications and a wide range of specialist programmes. Its local currency is Pound sterling (GBP). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "canada-destination",
    title: "Canada destination overview",
    terms: ["canada", "canadian", "cad"],
    text: "Canada is presented as a multicultural destination with university and college pathways across academic, technical and career-focused fields. Its local currency is the Canadian dollar (CAD). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
  {
    id: "spain-destination",
    title: "Spain destination overview",
    terms: ["spain", "spanish", "euro", "eur"],
    text: "Spain is presented as a vibrant European destination offering programmes in business, hospitality, technology and other international fields. Its local currency is the Euro (EUR). Use the supplied catalogue for programme records and tuition figures, and ask Strive to verify current details before applying.",
  },
];

export function retrieveKnowledge(query, limit = 4) {
  const queryTerms = normalize(query).split(" ").filter(term => term.length > 2 || term === "uk");
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
