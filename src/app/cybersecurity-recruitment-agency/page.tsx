import { Metadata } from "next";
import { CybersecurityRecruitmentAgencyClient } from "./CybersecurityRecruitmentAgencyClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

export const metadata: Metadata = {
  title: "Cybersecurity Recruitment Agency 🎯 Security Executive Search",
  description:
    "Find specialist cybersecurity recruitment agencies for CISO, Head of Security, and security leadership placements. Expert security recruiters with compliance, GRC, and technical security experience.",
  keywords: [
    "cybersecurity recruitment agency",
    "cybersecurity recruiter",
    "security recruitment agency",
    "ciso recruitment",
    "head of security recruitment",
    "information security recruitment",
    "security executive search",
    "infosec recruitment agency",
  ],
  openGraph: {
    title: "Cybersecurity Recruitment Agency 🎯 Security Executive Search",
    description: "Find specialist cybersecurity recruitment agencies for CISO and security leadership placements.",
    type: "website",
    url: "https://fractional.quest/cybersecurity-recruitment-agency",
  },
  alternates: { canonical: "https://fractional.quest/cybersecurity-recruitment-agency" },
};

const faqItems: FAQItem[] = [
  { question: "What is a cybersecurity recruitment agency?", answer: "A cybersecurity recruitment agency specialises in placing CISOs, security directors, and infosec leaders. They understand compliance frameworks (ISO 27001, SOC 2, GDPR), technical security, and GRC requirements." },
  { question: "How much does a cybersecurity recruiter charge?", answer: "Cybersecurity recruitment fees typically range from 22-32% due to high demand and limited talent pool. For CISO roles at regulated companies, expect 25-35% fees." },
  { question: "What should I look for in a security recruiter?", answer: "Key criteria: (1) Track record of CISO-level placements, (2) Understanding of compliance frameworks, (3) Network across different security domains, (4) Ability to assess both technical and leadership capabilities." },
  { question: "How long does CISO recruitment take?", answer: "CISO and security leadership roles typically take 8-14 weeks to fill. Specialist roles in regulated industries (finance, healthcare) may take longer due to compliance requirements." },
  { question: "What makes cybersecurity recruitment different?", answer: "Security recruiters must assess technical depth (penetration testing, cloud security, incident response) alongside compliance knowledge (SOC 2, ISO 27001) and business communication skills for board reporting." },
  { question: "What certifications do security recruiters look for?", answer: "Top security recruiters look for: CISSP, CISM, CISA, CEH, and cloud security certifications. For leadership roles, they also assess GRC experience and board-level communication capabilities." },
];

export default function CybersecurityRecruitmentAgencyPage() {
  return (
    <>
      <link rel="preload" href="/images/hero/ciso-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" />
      <link rel="preload" href="/images/hero/ciso-desktop.webp" as="image" type="image/webp" media="(min-width: 769px)" />
      <WebPageSchema title="Cybersecurity Recruitment Agency - Security Executive Search" description="Find specialist cybersecurity recruitment agencies for CISO and security leadership placements." url="https://fractional.quest/cybersecurity-recruitment-agency" dateModified={new Date("2026-01-30T00:00:00Z")} />
      <FAQPageSchema faqs={faqItems} />
      <CybersecurityRecruitmentAgencyClient />
    </>
  );
}
