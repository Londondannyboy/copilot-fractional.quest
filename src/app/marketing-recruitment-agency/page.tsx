import { Metadata } from "next";
import { MarketingRecruitmentAgencyClient } from "./MarketingRecruitmentAgencyClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

export const metadata: Metadata = {
  title: "Marketing Recruitment Agency 🎯 CMO & VP Marketing Search",
  description:
    "Find specialist marketing recruitment agencies for CMO, VP Marketing, and marketing leadership placements. Expert marketing recruiters for B2B, B2C, brand, and demand generation roles.",
  keywords: [
    "marketing recruitment agency",
    "cmo recruitment agency",
    "marketing recruiter",
    "vp marketing recruitment",
    "marketing executive search",
    "fractional cmo recruitment",
    "interim cmo recruitment",
    "head of marketing recruitment",
    "marketing director recruitment",
  ],
  openGraph: {
    title: "Marketing Recruitment Agency 🎯 CMO & VP Marketing Search",
    description: "Find specialist marketing recruitment agencies for CMO and VP Marketing placements.",
    type: "website",
    url: "https://fractional.quest/marketing-recruitment-agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Recruitment Agency 🎯 CMO & VP Marketing Search",
    description: "Find specialist marketing recruitment agencies for fractional, interim, and permanent placements.",
  },
  alternates: { canonical: "https://fractional.quest/marketing-recruitment-agency" },
};

const faqItems: FAQItem[] = [
  { question: "What is a marketing recruitment agency?", answer: "A marketing recruitment agency specialises in placing CMOs, VPs of Marketing, and marketing leaders. They understand brand strategy, demand generation, PLG, and can assess candidates for B2B, B2C, and DTC marketing roles." },
  { question: "How much does a marketing recruiter charge?", answer: "Marketing recruitment fees typically range from 15-25% of first year compensation. For fractional CMO placements, expect 15-25% of expected annual billings. Retained CMO search typically costs £15,000-£40,000." },
  { question: "What should I look for in a CMO recruiter?", answer: "Key criteria: (1) Track record of CMO-level placements, (2) Understanding of your marketing model (B2B, B2C, PLG), (3) Network in your sector, (4) Ability to assess both brand and performance marketing." },
  { question: "How long does CMO recruitment take?", answer: "Fractional or interim CMO placements typically take 3-6 weeks. Permanent CMO searches take 8-14 weeks for retained search including portfolio reviews and stakeholder interviews." },
  { question: "Should I use a marketing recruiter or a generalist?", answer: "Use a specialist marketing recruiter for CMO and VP-level roles. Generalist recruiters cannot properly assess marketing strategy, channel expertise, or team building capabilities." },
  { question: "What skills do marketing recruiters assess?", answer: "Top marketing recruiters assess: brand strategy, demand generation, marketing technology stack, team leadership, agency management, and board-level reporting capabilities." },
];

export default function MarketingRecruitmentAgencyPage() {
  return (
    <>
      <link rel="preload" href="/images/hero/cmo-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" />
      <link rel="preload" href="/images/hero/cmo-desktop.webp" as="image" type="image/webp" media="(min-width: 769px)" />
      <WebPageSchema title="Marketing Recruitment Agency - CMO & VP Marketing Executive Search" description="Find specialist marketing recruitment agencies for CMO and marketing leadership placements." url="https://fractional.quest/marketing-recruitment-agency" dateModified={new Date("2026-01-30T00:00:00Z")} />
      <FAQPageSchema faqs={faqItems} />
      <MarketingRecruitmentAgencyClient />
    </>
  );
}
