import { Metadata } from "next";
import { CTORecruitmentAgencyClient } from "./CTORecruitmentAgencyClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

export const metadata: Metadata = {
  title: "CTO Recruitment Agency | CTO Recruitment Services & Solutions",
  description:
    "Leading CTO recruitment agency & CTO recruitment services. CTO recruitment specialists, CTO recruitment company, CTO recruitment firm. Fractional CTO recruitment & interim CTO recruitment experts.",
  keywords: [
    "cto recruitment agency",
    "cto recruitment services",
    "cto recruitment",
    "cto recruitment specialists",
    "cto recruitment company",
    "cto recruitment professionals",
    "cto recruitment firm",
    "fractional cto recruitment",
    "interim cto recruitment",
  ],
  openGraph: {
    title: "CTO Recruitment Agency 🎯 Chief Technology Officer Search",
    description: "Find specialist CTO recruitment agencies. Expert recruiters with AI, cloud, security, and scale-up experience.",
    type: "website",
    url: "https://fractional.quest/cto-recruitment-agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "CTO Recruitment Agency 🎯 Chief Technology Officer Search",
    description: "Find specialist CTO recruitment agencies for fractional, interim, and permanent placements.",
  },
  alternates: { canonical: "https://fractional.quest/cto-recruitment-agency" },
};

const faqItems: FAQItem[] = [
  { question: "What is a CTO recruitment agency?", answer: "A CTO recruitment agency specialises in placing Chief Technology Officers with companies. They understand technical architecture, engineering leadership, and can assess candidates for AI/ML, cloud, security, and platform expertise." },
  { question: "How much does a CTO recruiter charge?", answer: "CTO recruitment fees typically range from 20-30% of first year compensation. For fractional CTO placements, expect 15-25% of expected annual billings. Retained CTO search typically costs £20,000-£60,000." },
  { question: "What should I look for in a CTO recruiter?", answer: "Key criteria: (1) Track record of CTO-level placements, (2) Technical assessment capabilities, (3) Network in your technology stack, (4) Understanding of startup vs enterprise CTO requirements." },
  { question: "How long does CTO recruitment take?", answer: "Fractional or interim CTO placements typically take 3-6 weeks. Permanent CTO searches take 8-16 weeks for retained search including technical assessments." },
  { question: "Should I use a CTO recruiter or a generalist?", answer: "Use a specialist CTO recruiter for technical leadership roles. Generalist recruiters cannot properly assess technical architecture, AI/ML expertise, or engineering management capabilities." },
  { question: "What technical skills do CTO recruiters assess?", answer: "Top CTO recruiters assess: system architecture, AI/ML strategy, cloud infrastructure (AWS/GCP/Azure), security posture, engineering team scaling, and technical due diligence capabilities." },
];

export default function CTORecruitmentAgencyPage() {
  return (
    <>
      <link rel="preload" href="/images/hero/cto-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" />
      <link rel="preload" href="/images/hero/cto-desktop.webp" as="image" type="image/webp" media="(min-width: 769px)" />
      <WebPageSchema title="CTO Recruitment Agency - Chief Technology Officer Executive Search" description="Find specialist CTO recruitment agencies for fractional, interim, and permanent CTO placements." url="https://fractional.quest/cto-recruitment-agency" dateModified={new Date("2026-01-30T00:00:00Z")} />
      <FAQPageSchema faqs={faqItems} />
      <CTORecruitmentAgencyClient />
    </>
  );
}
