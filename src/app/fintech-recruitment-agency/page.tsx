import { Metadata } from "next";
import { FintechRecruitmentAgencyClient } from "./FintechRecruitmentAgencyClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

export const metadata: Metadata = {
  title: "FinTech Recruitment Agency 🎯 Fintech Executive Search",
  description:
    "Find specialist FinTech recruitment agencies for CTO, CFO, and C-suite placements. Expert fintech recruiters with payments, banking, crypto, and FCA-regulated experience.",
  keywords: [
    "fintech recruitment agency",
    "fintech recruiter",
    "fintech executive search",
    "fintech cto recruitment",
    "fintech cfo recruitment",
    "payments recruitment agency",
    "crypto recruitment agency",
    "banking technology recruitment",
  ],
  openGraph: {
    title: "FinTech Recruitment Agency 🎯 Fintech Executive Search",
    description: "Find specialist FinTech recruitment agencies for C-suite placements with payments, banking, and crypto experience.",
    type: "website",
    url: "https://fractional.quest/fintech-recruitment-agency",
  },
  alternates: { canonical: "https://fractional.quest/fintech-recruitment-agency" },
};

const faqItems: FAQItem[] = [
  { question: "What is a fintech recruitment agency?", answer: "A fintech recruitment agency specialises in placing executives at financial technology companies. They understand payments, open banking, crypto, lending, and FCA regulatory requirements for technology leadership roles." },
  { question: "How much does a fintech recruiter charge?", answer: "Fintech recruitment fees typically range from 20-30% due to the specialist nature and high demand. For FCA-regulated roles or crypto expertise, expect premium rates of 25-35%." },
  { question: "What should I look for in a fintech recruiter?", answer: "Key criteria: (1) Track record in fintech placements, (2) Understanding of FCA/regulatory requirements, (3) Network across payments, banking, and crypto, (4) Ability to assess both technical and compliance capabilities." },
  { question: "How long does fintech executive recruitment take?", answer: "Fintech leadership roles typically take 6-10 weeks. FCA-regulated roles or crypto-specific expertise may take longer due to limited candidate pools and compliance requirements." },
  { question: "What makes fintech recruitment different?", answer: "Fintech recruiters must understand both technology (AI, blockchain, APIs) and financial services (payments, lending, compliance). They assess candidates for hybrid tech-finance capabilities that generalists miss." },
  { question: "What skills do fintech recruiters assess?", answer: "Top fintech recruiters assess: FCA compliance knowledge, payments infrastructure, open banking APIs, crypto/blockchain experience, and the ability to navigate regulated environments while moving fast." },
];

export default function FintechRecruitmentAgencyPage() {
  return (
    <>
      <link rel="preload" href="/images/hero/tech-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" />
      <link rel="preload" href="/images/hero/tech-desktop.webp" as="image" type="image/webp" media="(min-width: 769px)" />
      <WebPageSchema title="FinTech Recruitment Agency - Fintech Executive Search" description="Find specialist fintech recruitment agencies for C-suite placements with payments, banking, and crypto experience." url="https://fractional.quest/fintech-recruitment-agency" dateModified={new Date("2026-01-30T00:00:00Z")} />
      <FAQPageSchema faqs={faqItems} />
      <FintechRecruitmentAgencyClient />
    </>
  );
}
