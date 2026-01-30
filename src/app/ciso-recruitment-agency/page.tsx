import { Metadata } from "next";
import { CISORecruitmentAgencyClient } from "./CISORecruitmentAgencyClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

export const metadata: Metadata = {
  title: "CISO Recruitment Agency 🎯 Chief Information Security Officer Search",
  description:
    "Find specialist CISO recruitment agencies for fractional, interim, and permanent Chief Information Security Officer placements. Expert CISO recruiters with compliance, GRC, and technical security experience.",
  keywords: [
    "ciso recruitment agency",
    "ciso recruiter",
    "chief information security officer recruitment",
    "ciso executive search",
    "ciso headhunter",
    "fractional ciso recruitment",
    "interim ciso recruitment",
    "virtual ciso recruitment",
  ],
  openGraph: {
    title: "CISO Recruitment Agency 🎯 Chief Information Security Officer Search",
    description: "Find specialist CISO recruitment agencies for fractional, interim, and permanent CISO placements.",
    type: "website",
    url: "https://fractional.quest/ciso-recruitment-agency",
  },
  alternates: { canonical: "https://fractional.quest/ciso-recruitment-agency" },
};

const faqItems: FAQItem[] = [
  { question: "What is a CISO recruitment agency?", answer: "A CISO recruitment agency specialises exclusively in placing Chief Information Security Officers. They understand the specific requirements including compliance frameworks, technical security depth, and board-level communication." },
  { question: "How much does a CISO recruiter charge?", answer: "CISO recruitment fees typically range from 25-35% of first year compensation. For fractional CISO placements, expect 20-28% of expected annual billings. Retained CISO search typically costs £25,000-£60,000." },
  { question: "What should I look for in a CISO recruiter?", answer: "Key criteria: (1) Track record of CISO-level placements, (2) Understanding of your industry's compliance requirements, (3) Network of passive CISO candidates, (4) Ability to assess technical depth and business acumen." },
  { question: "How long does CISO recruitment take?", answer: "Fractional or interim CISO placements typically take 4-8 weeks. Permanent CISO searches take 10-16 weeks for retained search including technical assessments and stakeholder interviews." },
  { question: "Should I use a CISO recruiter or a generalist?", answer: "Always use a specialist CISO recruiter for security leadership roles. Generalist recruiters cannot properly assess security architecture, compliance expertise, or incident response capabilities." },
  { question: "What qualifications do CISO recruiters look for?", answer: "Top CISO recruiters look for: CISSP, CISM certifications, plus experience with relevant compliance frameworks (SOC 2, ISO 27001, GDPR, PCI-DSS). They also assess board reporting experience and team leadership." },
];

export default function CISORecruitmentAgencyPage() {
  return (
    <>
      <link rel="preload" href="/images/hero/ciso-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" />
      <link rel="preload" href="/images/hero/ciso-desktop.webp" as="image" type="image/webp" media="(min-width: 769px)" />
      <WebPageSchema title="CISO Recruitment Agency - Chief Information Security Officer Executive Search" description="Find specialist CISO recruitment agencies for fractional, interim, and permanent CISO placements." url="https://fractional.quest/ciso-recruitment-agency" dateModified={new Date("2026-01-30T00:00:00Z")} />
      <FAQPageSchema faqs={faqItems} />
      <CISORecruitmentAgencyClient />
    </>
  );
}
