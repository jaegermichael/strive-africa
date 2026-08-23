# Gemini-powered Strive Africa adviser

The floating adviser uses the Gemini REST streaming endpoint only from the Cloudflare Worker. The browser never receives `GEMINI_API_KEY`. The worker retrieves relevant passages from `worker/knowledgeBase.js` and matching records from the server-only programme catalogue before making each Gemini request.

## Knowledge sources

| Source | Coverage |
| --- | --- |
| Programme catalogue | Country, level, programme, university, listed fee, currency, and duration |
| Site knowledge base | Services, five-stage journey, FAQs, eligibility assessment, office and contact information, study guide, journal, student journeys, and safety boundaries |

The adviser is prohibited from using external programme sources or inventing fees, deadlines, entry requirements, availability, scholarship details, admissions decisions, or visa outcomes.

## Required Cloudflare secret

Create a restricted Gemini API key in Google AI Studio, then set it for the Worker:

```bash
npx wrangler secret put GEMINI_API_KEY
```

For a model override, optionally set a Worker variable named `GEMINI_MODEL`. The default is `gemini-3.7-flash`.

> Keep the API key out of Git, browser JavaScript, and public environment variables. Restrict it to the Gemini API in Google AI Studio or Google Cloud.
