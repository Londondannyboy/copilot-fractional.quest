import { Metadata } from "next";
import { FractionalExecutiveSearchClient } from "./FractionalExecutiveSearchClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

export const metadata: Metadata = {
  title: "Fractional Executive Search 🎯 Part-Time C-Suite Recruitment",
  description:
    "Find fractional executive search firms for part-time C-suite placements. Specialist fractional recruiters for CFO, CTO, CMO, and COO roles working 1-3 days per week.",
  keywords: [
    "fractional executive search",
    "fractional executive recruitment",
    "fractional recruiter",
    "part-time executive search",
    "fractional cfo search",
    "fractional cto search",
    "fractional cmo search",
    "fractional executive search firm",
  ],
  openGraph: {
    title: "Fractional Executive Search 🎯 Part-Time C-Suite Recruitment",
    description: "Find fractional executive search firms for part-time C-suite placements working 1-3 days per week.",
    type: "website",
    url: "https://fractional.quest/fractional-executive-search",
  },
  alternates: { canonical: "https://fractional.quest/fractional-executive-search" },
};

const faqItems: FAQItem[] = [
  { question: "What is fractional executive search?", answer: "Fractional executive search is a recruitment service for part-time C-suite and senior leadership positions. Fractional executives work 1-3 days per week ongoing, providing experienced leadership at a fraction of full-time cost." },
  { question: "How much does fractional executive search cost?", answer: "Fractional executive search fees typically range from 15-25% of expected first year billings. For a fractional CFO at £1,200/day working 2 days/week (104 days), expect fees of £15,000-£30,000." },
  { question: "How is fractional different from interim executive search?", answer: "Fractional executives work part-time (1-3 days/week) ongoing. Interim executives work full-time for a fixed period. Use fractional for ongoing strategic leadership; interim for temporary full-focus needs." },
  { question: "How long does fractional executive search take?", answer: "Fractional executive placements typically take 2-4 weeks for common roles (CFO, CTO, CMO). Specialist fractional recruiters with established networks can present candidates quickly." },
  { question: "What roles work well as fractional?", answer: "Best fractional roles: CFO (1-2 days), CMO (2-3 days), CTO (2-3 days), CHRO (1-2 days). Less suited: CEO (usually needs more presence), COO (operational roles need more time)." },
  { question: "What day rates do fractional executives charge?", answer: "Fractional executive day rates: CFO £1,000-£1,500/day, CTO £850-£1,400/day, CMO £700-£1,200/day, COO £800-£1,300/day. Rates depend on experience, sector, and company stage." },
];

export default function FractionalExecutiveSearchPage() {
  return (
    <>
      <link rel="preload" href="/images/hero/services-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" />
      <link rel="preload" href="/images/hero/services-desktop.webp" as="image" type="image/webp" media="(min-width: 769px)" />
      <WebPageSchema title="Fractional Executive Search - Part-Time C-Suite Recruitment" description="Find fractional executive search firms for part-time C-suite placements working 1-3 days per week." url="https://fractional.quest/fractional-executive-search" dateModified={new Date("2026-01-30T00:00:00Z")} />
      <FAQPageSchema faqs={faqItems} />
      <FractionalExecutiveSearchClient />
    </>
  );
}
