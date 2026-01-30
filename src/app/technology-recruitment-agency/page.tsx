import { Metadata } from "next";
import { TechnologyRecruitmentAgencyClient } from "./TechnologyRecruitmentAgencyClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

export const metadata: Metadata = {
  title: "Technology Recruitment Agency 🎯 Tech Executive Search",
  description:
    "Find specialist technology recruitment agencies for CTO, VP Engineering, and tech leadership placements. Expert tech recruiters with AI, cloud, security, and engineering management experience.",
  keywords: [
    "technology recruitment agency",
    "tech recruitment agency",
    "tech recruiter",
    "tech executive search",
    "vp engineering recruitment",
    "engineering director recruitment",
    "tech leadership recruitment",
    "software engineering recruitment",
  ],
  openGraph: {
    title: "Technology Recruitment Agency 🎯 Tech Executive Search",
    description: "Find specialist technology recruitment agencies for CTO, VP Engineering, and tech leadership placements.",
    type: "website",
    url: "https://fractional.quest/technology-recruitment-agency",
  },
  alternates: { canonical: "https://fractional.quest/technology-recruitment-agency" },
};

const faqItems: FAQItem[] = [
  { question: "What is a technology recruitment agency?", answer: "A technology recruitment agency specialises in placing CTOs, VPs of Engineering, and tech leaders. They understand system architecture, engineering management, AI/ML, cloud infrastructure, and can assess technical leadership capabilities." },
  { question: "How much does a tech recruiter charge?", answer: "Technology recruitment fees typically range from 18-28% of first year compensation for leadership roles. For CTO and VP Engineering, expect 20-30%. Specialist AI/ML recruiters may charge premium rates." },
  { question: "What should I look for in a tech recruiter?", answer: "Key criteria: (1) Track record of tech leadership placements, (2) Technical assessment capabilities, (3) Network in your tech stack, (4) Understanding of startup vs enterprise engineering cultures." },
  { question: "How long does tech executive recruitment take?", answer: "Tech leadership roles typically take 6-12 weeks to fill through retained search. VP Engineering and CTO searches may take longer for specific tech stacks or industries." },
  { question: "Should I use a tech recruiter or a generalist?", answer: "Always use a specialist technology recruiter for engineering leadership roles. Generalist recruiters cannot properly assess system architecture, engineering culture, or technical decision-making capabilities." },
  { question: "What technical skills do tech recruiters assess?", answer: "Top tech recruiters assess: system design, engineering management, AI/ML strategy, cloud architecture (AWS/GCP/Azure), DevOps practices, and technical team scaling experience." },
];

export default function TechnologyRecruitmentAgencyPage() {
  return (
    <>
      <link rel="preload" href="/images/hero/cto-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" />
      <link rel="preload" href="/images/hero/cto-desktop.webp" as="image" type="image/webp" media="(min-width: 769px)" />
      <WebPageSchema title="Technology Recruitment Agency - Tech Executive Search" description="Find specialist technology recruitment agencies for CTO, VP Engineering, and tech leadership placements." url="https://fractional.quest/technology-recruitment-agency" dateModified={new Date("2026-01-30T00:00:00Z")} />
      <FAQPageSchema faqs={faqItems} />
      <TechnologyRecruitmentAgencyClient />
    </>
  );
}
