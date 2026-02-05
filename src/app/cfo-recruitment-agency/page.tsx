import { Metadata } from "next";
import { CFORecruitmentAgencyClient } from "./CFORecruitmentAgencyClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

// SEO Metadata - optimized for "cfo recruitment agency" keyword
export const metadata: Metadata = {
  title: "8 Best CFO Recruitment Agencies UK 2026 | Compare Top Recruiters",
  description:
    "Best CFO recruitment agencies UK ranked. #1 Fractional Quest (Best Value, 10-15% fees) vs Big 5 (25-35%). Compare CFO recruiters, fees, placement times. Updated Feb 2026.",
  keywords: [
    "cfo recruitment agency",
    "cfo recruiter",
    "chief financial officer recruitment",
    "cfo executive search",
    "cfo headhunter",
    "fractional cfo recruitment",
    "interim cfo recruitment",
    "cfo search firm",
    "cfo placement agency",
  ],
  openGraph: {
    title: "8 Best CFO Recruitment Agencies UK 2026 | Compare Recruiters",
    description:
      "Best CFO recruitment agencies UK ranked. #1 Best Value: Fractional Quest (10-15% fees). Compare all top CFO recruiters.",
    type: "website",
    url: "https://fractional.quest/cfo-recruitment-agency",
    images: [
      {
        url: "https://fractional.quest/og-cfo-recruitment.png",
        width: 1200,
        height: 630,
        alt: "CFO Recruitment Agency - Chief Financial Officer Search Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "8 Best CFO Recruitment Agencies UK 2026 | Compare Recruiters",
    description:
      "Best CFO recruitment agencies UK ranked. Compare fees, placement times, specialisms.",
  },
  alternates: {
    canonical: "https://fractional.quest/cfo-recruitment-agency",
  },
};

const faqItems: FAQItem[] = [
  {
    question: "What is a CFO recruitment agency?",
    answer:
      "A CFO recruitment agency specialises exclusively in placing Chief Financial Officers with companies. They understand the specific requirements for CFO roles including M&A experience, fundraising track records, board reporting, and sector-specific expertise. Unlike general finance recruiters, CFO specialists focus only on C-suite finance appointments.",
  },
  {
    question: "How much does a CFO recruiter charge?",
    answer:
      "CFO recruitment fees typically range from 20-30% of first year compensation for permanent roles. For fractional CFO placements, expect 15-25% of expected annual billings. Retained CFO executive search typically costs £20,000-£50,000 depending on the seniority and complexity of the role.",
  },
  {
    question: "What should I look for in a CFO recruiter?",
    answer:
      "Key criteria: (1) Track record of CFO-level placements, not just senior finance roles, (2) Understanding of your sector (PE-backed, VC-backed, public company), (3) Network of passive CFO candidates, (4) Ability to assess technical skills like M&A, fundraising, and systems implementation.",
  },
  {
    question: "How long does CFO recruitment take?",
    answer:
      "Fractional or interim CFO placements typically take 3-6 weeks through an agency. Permanent CFO searches take longer, usually 8-16 weeks for a full retained search including long-listing, interviews, and offer negotiation.",
  },
  {
    question: "Should I use a CFO recruiter or a generalist?",
    answer:
      "Always use a specialist CFO recruiter for C-suite finance appointments. Generalist recruiters lack the network and assessment capabilities for CFO-level roles. The marginal fee difference is worth it for better candidate quality and faster placement.",
  },
  {
    question: "What qualifications do CFO recruiters look for?",
    answer:
      "Top CFO recruiters look for ACA, ACCA, or CIMA qualifications from a Big 4 or top-tier audit firm, plus significant post-qualification experience in industry. For CFO roles, they also assess strategic experience: M&A, fundraising, IPO preparation, and board-level presentation skills.",
  },
];

export default function CFORecruitmentAgencyPage() {
  return (
    <>
      {/* Preload hero image */}
      <link
        rel="preload"
        href="/images/hero/cfo-mobile.webp"
        as="image"
        type="image/webp"
        media="(max-width: 768px)"
      />
      <link
        rel="preload"
        href="/images/hero/cfo-desktop.webp"
        as="image"
        type="image/webp"
        media="(min-width: 769px)"
      />

      {/* Schema Markup */}
      <WebPageSchema
        title="CFO Recruitment Agency - Chief Financial Officer Executive Search"
        description="Find specialist CFO recruitment agencies for fractional, interim, and permanent Chief Financial Officer placements."
        url="https://fractional.quest/cfo-recruitment-agency"
        dateModified={new Date("2026-02-05T00:00:00Z")}
      />
      <FAQPageSchema faqs={faqItems} />

      {/* Page Content */}
      <CFORecruitmentAgencyClient />
    </>
  );
}
