import { Metadata } from "next";
import { CISOExecutiveSearchClient } from "./CISOExecutiveSearchClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

export const metadata: Metadata = {
  title: "CISO Executive Search 🎯 Chief Information Security Officer Headhunters",
  description:
    "Find CISO executive search firms for senior security leadership placements. Specialist CISO headhunters with deep networks in cybersecurity, compliance, and technology sectors.",
  keywords: [
    "ciso executive search",
    "ciso headhunter",
    "ciso search firm",
    "chief information security officer executive search",
    "security executive search",
    "ciso executive recruitment",
    "senior ciso search",
    "ciso retained search",
  ],
  openGraph: {
    title: "CISO Executive Search 🎯 Chief Information Security Officer Headhunters",
    description: "Find CISO executive search firms for senior security leadership placements.",
    type: "website",
    url: "https://fractional.quest/ciso-executive-search",
  },
  alternates: { canonical: "https://fractional.quest/ciso-executive-search" },
};

const faqItems: FAQItem[] = [
  { question: "What is CISO executive search?", answer: "CISO executive search is a retained recruitment service specifically for Chief Information Security Officer placements. Unlike contingent recruitment, executive search firms are paid upfront to conduct thorough, confidential searches for senior security leaders." },
  { question: "How much does CISO executive search cost?", answer: "CISO executive search typically costs £30,000-£80,000 for a retained search, usually calculated as 30-35% of first year compensation. Payment is typically structured as thirds: 1/3 upfront, 1/3 at shortlist, 1/3 at placement." },
  { question: "How is CISO executive search different from recruitment?", answer: "Executive search is a proactive, retained process where the firm approaches passive candidates. Recruitment is typically contingent and reactive. For CISO roles, executive search provides access to candidates not actively looking." },
  { question: "How long does CISO executive search take?", answer: "A full CISO executive search typically takes 12-20 weeks including market mapping, approach, assessment, and offer negotiation. Confidential searches may take longer." },
  { question: "When should I use CISO executive search vs recruitment?", answer: "Use executive search for: (1) Senior CISO roles at large enterprises, (2) Confidential replacements, (3) Highly specialised requirements, (4) When you need access to passive candidates. Use recruitment for interim or less senior roles." },
  { question: "What do CISO executive search firms assess?", answer: "CISO executive search firms conduct in-depth assessments of: technical security expertise, compliance framework knowledge, board-level communication, crisis management experience, and cultural fit with stakeholder interviews." },
];

export default function CISOExecutiveSearchPage() {
  return (
    <>
      <link rel="preload" href="/images/hero/ciso-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" />
      <link rel="preload" href="/images/hero/ciso-desktop.webp" as="image" type="image/webp" media="(min-width: 769px)" />
      <WebPageSchema title="CISO Executive Search - Chief Information Security Officer Headhunters" description="Find CISO executive search firms for senior security leadership placements." url="https://fractional.quest/ciso-executive-search" dateModified={new Date("2026-01-30T00:00:00Z")} />
      <FAQPageSchema faqs={faqItems} />
      <CISOExecutiveSearchClient />
    </>
  );
}
