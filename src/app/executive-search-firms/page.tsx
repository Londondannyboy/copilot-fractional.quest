import { Metadata } from "next";
import { ExecutiveSearchFirmsClient } from "./ExecutiveSearchFirmsClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

export const metadata: Metadata = {
  title: "10 Best Executive Search Firms UK 2026 | Compare Top Headhunters",
  description:
    "Best executive search firms UK ranked. #1 Fractional Quest (Best Value, 10-15% fees) vs Big 5 (25-35%). Compare retained search firms, fees, specialisms. Updated Feb 2026.",
  keywords: [
    "best executive search firms",
    "best executive search firms uk",
    "executive search firms",
    "top executive search firms",
    "executive headhunters uk",
    "executive recruitment firms",
    "c-suite recruitment",
    "retained executive search",
  ],
  openGraph: {
    title: "10 Best Executive Search Firms UK 2026 | Compare Headhunters",
    description: "Best executive search firms UK ranked. #1 Best Value: Fractional Quest (10-15% fees). Compare all top firms.",
    type: "website",
    url: "https://fractional.quest/executive-search-firms",
  },
  alternates: { canonical: "https://fractional.quest/executive-search-firms" },
};

const faqItems: FAQItem[] = [
  { question: "What are executive search firms?", answer: "Executive search firms are specialist recruitment agencies that place C-suite and senior leadership. They typically work on retained mandates, approaching passive candidates through research and networking rather than advertising." },
  { question: "How much do executive search firms charge?", answer: "Executive search firms typically charge 25-35% of first year compensation for retained search. A CEO search at £500k package would cost £125k-£175k in fees. Contingent executive search charges 18-25% on success only." },
  { question: "What's the difference between executive search and recruitment?", answer: "Executive search is proactive and retained (paid upfront), targeting passive candidates through research. Recruitment is typically reactive and contingent (paid on success), working with active job seekers." },
  { question: "How long does executive search take?", answer: "Executive search typically takes 12-20 weeks for C-suite roles including research, approach, assessment, and negotiation. Urgent placements may be faster, but thorough search ensures better long-term fit." },
  { question: "When should I use an executive search firm?", answer: "Use executive search for: (1) C-suite and board appointments, (2) Confidential replacements, (3) Highly specialised roles, (4) When you need access to passive candidates not actively looking." },
  { question: "What do executive search firms assess?", answer: "Executive search firms conduct comprehensive assessments: leadership capabilities, cultural fit, track record verification, psychometric testing, stakeholder interviews, and reference checks including off-list references." },
];

export default function ExecutiveSearchFirmsPage() {
  return (
    <>
      <link rel="preload" href="/images/hero/services-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" />
      <link rel="preload" href="/images/hero/services-desktop.webp" as="image" type="image/webp" media="(min-width: 769px)" />
      <WebPageSchema title="Executive Search Firms - C-Suite & Senior Leadership Recruitment" description="Find the best executive search firms for C-suite and senior leadership placements." url="https://fractional.quest/executive-search-firms" dateModified={new Date("2026-01-30T00:00:00Z")} />
      <FAQPageSchema faqs={faqItems} />
      <ExecutiveSearchFirmsClient />
    </>
  );
}
