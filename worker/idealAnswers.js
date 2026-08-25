const normalise = value => value.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();

// These responses are grouped and safety-edited from the supplied STRIVE Student Chatbot Question Bank.
// They are used only for clear, high-confidence question patterns. Dynamic details remain with Strive.
export const idealAnswerPatterns = [
  {
    id: "what-strive-is",
    terms: ["what is strive", "what does strive do", "education consultancy", "are you a university"],
    answer: "Strive is an education consultancy, not a university. We help students explore suitable study-abroad pathways, prepare applications, understand visa preparation and plan for departure; admission, tuition and qualifications are provided by the institution a student enrols with.",
  },
  {
    id: "office-and-contact",
    terms: ["where is your office", "office located", "office address", "where are you based", "harare office", "office harare", "office"],
    answer: "Strive Africa is at Office 35, 6 Chelmsford Road, Belgravia, Harare, Zimbabwe. You can call or WhatsApp the team on +263 71 673 0064 before visiting.",
  },
  {
    id: "legitimacy-and-payment-safety",
    terms: ["are you legit", "is strive legitimate", "confirm strive", "genuine agent", "safe to pay", "verify payment", "verify invoice"],
    answer: "You can visit the Strive office, ask for the relevant company or partner details, and verify an offer or invoice with the issuing institution before making a payment. Use only official, receipted payment channels and do not pay into an account that has not been confirmed in writing.",
  },
  {
    id: "remote-consultation",
    terms: ["apply without visiting", "apply remotely", "through whatsapp", "online consultation", "book a consultation", "parent attend"],
    answer: "Many study-planning conversations can begin remotely through WhatsApp or an online consultation. For a useful first discussion, Strive can consider your study level, preferred course, destination and budget; a parent or sponsor may join a consultation when appropriate.",
  },
  {
    id: "no-guarantees",
    terms: ["guarantee admission", "guarantee visa", "guaranteed visa", "guaranteed admission"],
    answer: "No. Admission is decided by the institution after it reviews the application, and visa decisions are made by the relevant immigration authority. Strive can help prepare an accurate application and visa file, but cannot guarantee either outcome.",
  },
  {
    id: "choosing-a-destination",
    terms: ["which country is best", "most affordable country", "lowest cost of living", "safest country", "choose a country", "compare two countries", "which destination"],
    answer: "There is no single best destination for everyone. A realistic comparison starts with your results, preferred course, tuition budget, living-cost budget and intended intake; Strive can then help compare suitable study routes and confirm current requirements.",
  },
  {
    id: "country-support",
    terms: ["help me study in malaysia", "help me study in spain", "help me study in hungary", "help me study in poland", "help me study in uae", "help me study in georgia", "help me study abroad"],
    answer: "Yes. Strive can help you explore suitable study options from its approved catalogue and partner routes. The most useful next step is to share your preferred course, study level, destination and budget so the team can confirm realistic current options.",
  },
  {
    id: "olevel-pathways",
    terms: ["o levels only", "o level only", "five o levels", "five o level", "with o levels", "o level passes", "failed mathematics", "failed english"],
    answer: "O-Level results can lead to foundation, certificate or diploma pathways, but the suitable route depends on your full subjects, grades, course and institution. Direct degree entry commonly needs further qualifications or an accepted equivalent, so Strive should assess your results before recommending a route.",
  },
  {
    id: "alevel-pathways",
    terms: ["a level passes", "a levels", "a level results", "one a level", "two a levels", "three a levels", "a level subjects"],
    answer: "A-Level requirements vary by institution and course. Relevant subjects are particularly important for specialised programmes, while some routes may have different entry pathways; Strive can compare your full O-Level and A-Level profile against current institution requirements.",
  },
  {
    id: "foundation-and-progression",
    terms: ["foundation programme", "foundation course", "certificate to diploma", "diploma to degree", "progress to degree", "bridging course"],
    answer: "A foundation, certificate or diploma may be a realistic pathway when direct entry is not available. Progression is not automatic: the next-stage requirements depend on the institution and programme, so Strive should confirm the specific route before you apply.",
  },
  {
    id: "medicine-and-regulated-programmes",
    terms: ["study medicine", "medical school", "pharmacy", "dentistry", "nursing", "physiotherapy", "health sciences", "medical laboratory"],
    answer: "Health and regulated programmes can have stricter academic, subject and professional-recognition requirements than other courses. Strive can help identify available routes, but the institution and relevant regulator must confirm entry and recognition requirements before you commit.",
  },
  {
    id: "accreditation-and-verification",
    terms: ["accredited", "accreditation", "recognised university", "recognition", "verify university", "is this university real"],
    answer: "It is sensible to verify the institution, programme and any recognition relevant to your future plans before paying or enrolling. Strive can help you identify the appropriate checks, but the university and relevant regulator are the authorities that confirm current accreditation or professional recognition.",
  },
  {
    id: "applications-and-documents",
    terms: ["application documents", "what documents", "apply to university", "personal statement", "motivation letter", "offer letter", "application process"],
    answer: "Strive can guide you through application requirements, forms, academic documents, statements and submission steps. Requirements differ by institution and intake, so confirm the current checklist with Strive before sending an application; do not share sensitive documents in this chat.",
  },
  {
    id: "intakes-and-deadlines",
    terms: ["next intake", "application deadline", "when can i apply", "how long does application", "intake dates", "january intake", "september intake"],
    answer: "Intakes and deadlines vary by institution, programme and destination, and they can change. Strive can check the current options for your preferred course and intake before you plan an application.",
  },
  {
    id: "strive-fees-and-payments",
    terms: ["strive fee", "agent fee", "consultation fee", "service fee", "payment plan", "how do i pay"],
    answer: "Ask Strive for a clear, current explanation of any service charges and payment steps for your route before you proceed. Keep official receipts and verify payment instructions in writing; programme tuition and Strive service charges are separate matters.",
  },
  {
    id: "tuition-scholarships-refunds",
    terms: ["tuition fee", "how much does it cost", "scholarship", "discount", "refund", "can i get a refund", "cost to study"],
    answer: "Strive’s catalogue can show tuition figures for listed programmes, but they are tuition only and may change by institution, programme and intake. Living costs, visa costs, insurance, flights and other charges are separate; scholarships and refunds depend on the institution’s current terms and must be confirmed before payment.",
  },
  {
    id: "sponsors-and-funds",
    terms: ["sponsor", "proof of funds", "bank balance", "financial requirements", "who can sponsor", "bank statement"],
    answer: "Financial evidence and sponsorship requirements depend on the destination, institution and immigration process. Strive can explain the documents that may be relevant to your route, but current requirements must be confirmed with the appropriate institution and authority before submission.",
  },
  {
    id: "visa-support",
    terms: ["student visa", "visa requirements", "visa application", "visa documents", "visa interview", "visa refusal", "visa rejected", "appeal a visa"],
    answer: "Strive’s visa-centre support can help you prepare checklists, forms and supporting documents for the relevant route. Visa rules and decisions belong to the relevant authority, so Strive cannot guarantee an outcome; a refusal or unusual case should be reviewed by a human consultant before you take the next step.",
  },
  {
    id: "english-requirements",
    terms: ["english requirement", "ielts", "toefl", "english test", "language requirement", "english proficiency"],
    answer: "English-language requirements depend on the institution, programme and your existing qualifications. Strive can help you identify what to check, but the university must confirm the current accepted tests, scores or exemptions for the programme you choose.",
  },
  {
    id: "accommodation-and-living-costs",
    terms: ["accommodation", "housing", "living cost", "cost of living", "rent", "where will i stay"],
    answer: "Accommodation and living costs vary by city, provider, room type and personal choices. Strive can help you discuss the available route and arrival planning, but current housing availability, prices and arrangements must be confirmed before you commit.",
  },
  {
    id: "work-rights-and-poststudy",
    terms: ["work while studying", "part time work", "work permit", "work during holidays", "student job", "post study work", "permanent residence", "can i work"],
    answer: "Work rights, hours, permissions and post-study options depend on current immigration rules, your visa and the destination. Strive cannot confirm those rules in chat; check the current position with the relevant authority and Strive before relying on work or post-study plans.",
  },
  {
    id: "travel-arrival-support",
    terms: ["flight", "book a flight", "airport pickup", "arrive", "travel support", "departure"],
    answer: "After admission and visa preparation, Strive can discuss travel planning, flight options, reporting dates, baggage guidance and arrival arrangements where available. The current availability of any travel or arrival service should be confirmed with Strive.",
  },
  {
    id: "parent-safety-wellbeing",
    terms: ["is it safe", "child safe", "parent updates", "my child", "student safety", "becomes ill", "insurance"],
    answer: "No destination is risk-free, so families should verify the institution and accommodation and follow local, campus and emergency guidance. For an adult student, application updates can be shared with a parent or sponsor only with the student’s consent.",
  },
  {
    id: "privacy-and-complaints",
    terms: ["privacy", "personal information", "complaint", "complain", "data protection", "delete my data", "sensitive documents"],
    answer: "Strive should use personal information only for the relevant consultation or application support. Do not send sensitive documents in this chat; use an official Strive channel when the team asks for a document, and raise any service concern directly with Strive so it can be reviewed.",
  },
];

export function findIdealAnswer(question) {
  const query = normalise(question);
  const candidates = idealAnswerPatterns
    .map(pattern => {
      const matchingTerms = pattern.terms.filter(term => query.includes(normalise(term)));
      return { pattern, score: matchingTerms.length ? Math.max(...matchingTerms.map(term => normalise(term).split(" ").length)) : 0 };
    })
    .filter(candidate => candidate.score > 0)
    .sort((left, right) => right.score - left.score || left.pattern.id.localeCompare(right.pattern.id));
  return candidates[0]?.pattern;
}
