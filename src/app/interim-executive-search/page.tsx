import { Metadata } from "next";
import { InterimExecutiveSearchClient } from "./InterimExecutiveSearchClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

export const metadata: Metadata = {
  title: "Interim Executive Search 🎯 Temporary C-Suite Recruitment",
  description:
    "Find interim executive search firms for temporary C-suite placements. Specialist interim recruiters for CFO, CTO, CMO, and CEO roles. Fast placement in 2-4 weeks.",
  keywords: [
    "interim executive search",
    "interim executive recruitment",
    "interim management recruitment",
    "temporary executive search",
    "interim cfo search",
    "interim cto search",
    "interim cmo search",
    "c-suite interim recruitment",
  ],
  openGraph: {
    title: "Interim Executive Search 🎯 Temporary C-Suite Recruitment",
    description: "Find interim executive search firms for temporary C-suite placements. Fast placement in 2-4 weeks.",
    type: "website",
    url: "https://fractional.quest/interim-executive-search",
  },
  alternates: { canonical: "https://fractional.quest/interim-executive-search" },
};

const faqItems: FAQItem[] = [
  { question: "What is interim executive search?", answer: "Interim executive search is a recruitment service for temporary C-suite and senior leadership positions. Interim executives work full-time for a defined period (typically 3-12 months) to cover gaps, lead transformations, or manage crises." },
  { question: "How much does interim executive search cost?", answer: "Interim executive search fees typically range from 15-25% of the total contract value. For a 6-month interim CFO at £1,500/day, expect placement fees of £15,000-£25,000." },
  { question: "How is interim different from fractional executive search?", answer: "Interim executives work full-time (5 days/week) for a fixed period. Fractional executives work part-time (1-3 days/week) ongoing. Use interim for urgent, full-focus needs; fractional for ongoing part-time leadership." },
  { question: "How long does interim executive search take?", answer: "Interim executive placements are typically faster than permanent search: 2-4 weeks for common roles (CFO, CTO). Agencies with established networks can often present candidates within days." },
  { question: "When should I hire an interim executive?", answer: "Hire interim executives for: (1) Sudden departures requiring immediate coverage, (2) Transformations requiring dedicated focus, (3) M&A integration periods, (4) Crisis management, (5) Bridge roles while recruiting permanently." },
  { question: "What day rates do interim executives charge?", answer: "Interim executive day rates vary by role: CFO £1,200-£1,800/day, CTO £1,000-£1,600/day, CMO £900-£1,400/day, CEO £1,500-£2,500/day. Rates depend on sector, company size, and complexity." },
];

export default function InterimExecutiveSearchPage() {
  return (
    <>
      <link rel="preload" href="/images/hero/services-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" />
      <link rel="preload" href="/images/hero/services-desktop.webp" as="image" type="image/webp" media="(min-width: 769px)" />
      <WebPageSchema title="Interim Executive Search - Temporary C-Suite Recruitment" description="Find interim executive search firms for temporary C-suite placements. Fast placement in 2-4 weeks." url="https://fractional.quest/interim-executive-search" dateModified={new Date("2026-01-30T00:00:00Z")} />
      <FAQPageSchema faqs={faqItems} />
      <InterimExecutiveSearchClient />
    </>
  );
}
