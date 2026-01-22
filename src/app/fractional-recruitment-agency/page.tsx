import { Metadata } from "next";
import { RecruitmentAgencyClient } from "./RecruitmentAgencyClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

// SEO Metadata - optimized for "fractional recruitment agency" keyword
export const metadata: Metadata = {
  title: "Fractional Recruitment Agency UK 🎯 Best Agencies 2026",
  description:
    "Find the best fractional recruitment agencies in the UK. Compare specialist agencies for fractional CFO, CTO, CMO, and C-suite placements. Understand agency fees (15-25%), timelines (2-4 weeks), and how to choose the right fractional recruitment agency.",
  keywords: [
    "fractional recruitment agency",
    "fractional recruitment agencies uk",
    "fractional executive recruitment",
    "fractional cfo recruitment",
    "fractional cto recruitment",
    "fractional cmo recruitment",
    "interim executive recruitment",
    "part time executive recruitment",
    "fractional c-suite recruitment",
  ],
  openGraph: {
    title: "Fractional Recruitment Agency UK 🎯 Best Agencies 2026",
    description:
      "Find the best fractional recruitment agencies in the UK. Compare specialists in CFO, CTO, CMO placements. Fees 15-25%, placements in 2-4 weeks.",
    type: "website",
    url: "https://fractional.quest/fractional-recruitment-agency",
    images: [
      {
        url: "https://fractional.quest/og-recruitment-agency.png",
        width: 1200,
        height: 630,
        alt: "Fractional Recruitment Agency UK - Best Agencies Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fractional Recruitment Agency UK 🎯 Best Agencies 2026",
    description:
      "Find the best fractional recruitment agencies in the UK. Compare specialists in CFO, CTO, CMO placements.",
  },
  alternates: {
    canonical: "https://fractional.quest/fractional-recruitment-agency",
  },
};

const faqItems: FAQItem[] = [
  {
    question: "What is a fractional recruitment agency?",
    answer:
      "A fractional recruitment agency specialises in placing part-time, interim, and fractional executives with companies. Unlike traditional recruiters who focus on full-time permanent hires, these agencies understand the fractional model, day rates, and how to match executives with multiple clients.",
  },
  {
    question: "How much do fractional recruitment agencies charge?",
    answer:
      "Fees typically range from 15-25% of the first year's expected billings (based on agreed days × day rate × 52 weeks). Some agencies charge flat fees of £5,000-£15,000 per placement. Retained search for senior roles may cost £15,000-£30,000.",
  },
  {
    question: "What's the difference between a fractional agency and a traditional recruiter?",
    answer:
      "Fractional agencies understand part-time executive work, IR35 implications, day rate negotiations, and multi-client relationships. Traditional recruiters often push for full-time placements and may not understand fractional contract structures or portfolio career dynamics.",
  },
  {
    question: "How long does it take to find a fractional executive through an agency?",
    answer:
      "Typically 2-4 weeks for common roles (CFO, CMO, CTO) and 4-8 weeks for specialist positions. Agencies with established networks can often present shortlisted candidates within days.",
  },
  {
    question: "Should I use an agency or hire directly?",
    answer:
      "Use an agency if you need speed, don't have time to source, want pre-vetted candidates, or need a specialist role. Hire directly if you have strong networks, want to save fees, or are hiring for a common role where you can easily assess quality yourself.",
  },
  {
    question: "What should I look for in a fractional recruitment agency?",
    answer:
      "Key criteria: (1) Specialism in fractional/interim work, not just traditional recruitment, (2) Track record with your industry or role type, (3) Understanding of IR35 and contractor compliance, (4) Quality of their candidate network, (5) Transparent fee structure.",
  },
];

export default function FractionalRecruitmentAgencyPage() {
  return (
    <>
      {/* Schema Markup */}
      <WebPageSchema
        title="Fractional Recruitment Agency UK - Best Agencies for Fractional Executives 2026"
        description="Find the best fractional recruitment agencies in the UK. Compare agencies specialising in fractional CFO, CTO, CMO, and C-suite placements. Understand fees, timelines, and how to choose."
        url="https://fractional.quest/fractional-recruitment-agency"
        dateModified={new Date("2026-01-22T00:00:00Z")}
      />
      <FAQPageSchema faqs={faqItems} />

      {/* Page Content */}
      <RecruitmentAgencyClient />
    </>
  );
}
