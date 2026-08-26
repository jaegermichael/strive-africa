import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = "https://www.africastrive.com";
const title = "Study Abroad Consultants in Harare, Zimbabwe | Strive Africa";
const description = "Study abroad from Zimbabwe with Strive Africa: university placement, applications, visa preparation and flight support from Belgravia, Harare.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Strive Africa",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  keywords: ["study abroad Zimbabwe", "study abroad consultants Harare", "education consultancy Harare", "university placement Zimbabwe", "international university applications Zimbabwe", "student visa assistance Zimbabwe", "study in Malaysia from Zimbabwe", "study in Europe from Zimbabwe"],
  authors: [{ name: "Strive Africa" }],
  creator: "Strive Africa",
  publisher: "Strive Africa",
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  icons: { icon: "/strive-logo.jpeg" },
  openGraph: { type: "website", url: siteUrl, siteName: "Strive Africa", title, description, locale: "en_ZW", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Strive Africa study abroad guidance from Zimbabwe" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteUrl}/#organization`,
    name: "Strive Africa",
    alternateName: ["Strivio Education Solutions", "Strive Education"],
    url: siteUrl,
    logo: `${siteUrl}/strive-logo.jpeg`,
    image: `${siteUrl}/og.png`,
    description,
    telephone: "+263716730064",
    email: "batsirai@striveafriqa.com",
    address: [
      { "@type": "PostalAddress", streetAddress: "Office 35, 6 Chelmsford Road, Belgravia", addressLocality: "Harare", addressCountry: "ZW" },
      { "@type": "PostalAddress", streetAddress: "Number 5 Benmore Gardens, Corworx", addressRegion: "Gauteng", addressCountry: "ZA" },
    ],
    areaServed: [{ "@type": "Country", name: "Zimbabwe" }, { "@type": "Country", name: "South Africa" }],
    sameAs: ["https://www.facebook.com/afriqastrive", "https://www.tiktok.com/@striveafrica.edu", "https://www.instagram.com/strive_africa?igsi=OTFqeTc0dm53NzRo"],
    contactPoint: [{ "@type": "ContactPoint", telephone: "+263716730064", contactType: "customer service", areaServed: "ZW", availableLanguage: "English" }],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Strive Africa",
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-ZW",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: [
      { "@type": "Question", name: "Are these fees final?", acceptedAnswer: { "@type": "Answer", text: "The figures are copied from Strive’s supplied master file. Fees, exchange rates and intakes can change, so the team will verify the current amount before you apply." } },
      { "@type": "Question", name: "Can you help me choose a course?", acceptedAnswer: { "@type": "Answer", text: "Yes. Strive connects your interests, academic background, budget and career direction to suitable study pathways." } },
      { "@type": "Question", name: "What if a country has no programmes listed?", acceptedAnswer: { "@type": "Answer", text: "Contact the team. The destination remains available for consultation while its programme list is being confirmed." } },
      { "@type": "Question", name: "Where can I meet the team?", acceptedAnswer: { "@type": "Answer", text: "Visit Office 35, 6 Chelmsford Road, Belgravia, Harare, Zimbabwe, or call and WhatsApp +263 71 673 0064." } },
    ],
  },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-ZW"><body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    {children}
    {structuredData.map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }} />)}
  </body></html>;
}
