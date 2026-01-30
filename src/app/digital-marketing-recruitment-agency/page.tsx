import { Metadata } from "next";
import { DigitalMarketingRecruitmentAgencyClient } from "./DigitalMarketingRecruitmentAgencyClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

export const metadata: Metadata = {
  title: "Digital Marketing Recruitment Agency 🎯 Performance & Growth Hiring",
  description:
    "Find specialist digital marketing recruitment agencies for performance marketing, demand generation, and growth leadership. Expert digital marketing recruiters for SEO, PPC, and PLG roles.",
  keywords: [
    "digital marketing recruitment agency",
    "digital marketing recruiter",
    "performance marketing recruitment",
    "growth marketing recruitment",
    "demand generation recruitment",
    "seo recruitment agency",
    "ppc recruitment agency",
    "head of digital recruitment",
  ],
  openGraph: {
    title: "Digital Marketing Recruitment Agency 🎯 Performance & Growth Hiring",
    description: "Find specialist digital marketing recruitment agencies for performance and growth marketing leadership.",
    type: "website",
    url: "https://fractional.quest/digital-marketing-recruitment-agency",
  },
  alternates: { canonical: "https://fractional.quest/digital-marketing-recruitment-agency" },
};

const faqItems: FAQItem[] = [
  { question: "What is a digital marketing recruitment agency?", answer: "A digital marketing recruitment agency specialises in placing performance marketers, growth leaders, and digital marketing executives. They understand SEO, PPC, demand generation, marketing automation, and data-driven marketing." },
  { question: "How much does a digital marketing recruiter charge?", answer: "Digital marketing recruitment fees typically range from 15-20% of first year salary. For Head of Digital or VP Growth roles, expect 18-25%. Specialist performance marketing recruiters may charge premium rates for hard-to-fill roles." },
  { question: "What skills do digital marketing recruiters assess?", answer: "Key skills: SEO/SEM expertise, paid media management (Google, Meta, LinkedIn), marketing automation platforms, attribution modeling, conversion optimization, and growth experimentation frameworks." },
  { question: "How long does digital marketing recruitment take?", answer: "Digital marketing leadership roles typically take 4-8 weeks to fill. Specialist roles like Head of SEO or VP Growth may take longer due to limited candidate pools." },
  { question: "Should I use a digital marketing recruiter or generalist?", answer: "Use a specialist digital marketing recruiter for senior performance and growth roles. They can properly assess technical skills, platform experience, and growth metrics that generalists cannot evaluate." },
  { question: "What's the difference between marketing and digital marketing recruitment?", answer: "Digital marketing recruiters focus on performance marketing, growth, and data-driven roles. General marketing recruiters cover brand, communications, and traditional marketing. For performance-focused roles, use a digital specialist." },
];

export default function DigitalMarketingRecruitmentAgencyPage() {
  return (
    <>
      <link rel="preload" href="/images/hero/marketing-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" />
      <link rel="preload" href="/images/hero/marketing-desktop.webp" as="image" type="image/webp" media="(min-width: 769px)" />
      <WebPageSchema title="Digital Marketing Recruitment Agency - Performance & Growth Marketing Search" description="Find specialist digital marketing recruitment agencies for performance marketing and growth leadership." url="https://fractional.quest/digital-marketing-recruitment-agency" dateModified={new Date("2026-01-30T00:00:00Z")} />
      <FAQPageSchema faqs={faqItems} />
      <DigitalMarketingRecruitmentAgencyClient />
    </>
  );
}
