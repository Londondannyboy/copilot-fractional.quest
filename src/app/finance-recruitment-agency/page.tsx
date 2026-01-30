import { Metadata } from "next";
import { FinanceRecruitmentAgencyClient } from "./FinanceRecruitmentAgencyClient";
import { WebPageSchema, FAQPageSchema, FAQItem } from "@/components/seo";

// SEO Metadata - optimized for "finance recruitment agency" keyword
export const metadata: Metadata = {
  title: "Finance Recruitment Agency 🎯 CFO & FD Recruitment",
  description:
    "Find the best finance recruitment agencies for CFO, Finance Director, and FD recruitment. Specialist agencies for fractional, interim, and permanent finance leadership. Fees 15-25%, placements in 2-4 weeks.",
  keywords: [
    "finance recruitment agency",
    "cfo recruitment agency",
    "finance director recruitment",
    "fd recruitment agency",
    "finance recruiter",
    "cfo recruiter",
    "finance executive search",
    "fractional cfo recruitment",
    "interim cfo recruitment",
    "finance leadership recruitment",
  ],
  openGraph: {
    title: "Finance Recruitment Agency 🎯 CFO & FD Recruitment",
    description:
      "Find the best finance recruitment agencies for CFO, Finance Director, and FD recruitment. Specialist agencies for fractional and interim finance leadership.",
    type: "website",
    url: "https://fractional.quest/finance-recruitment-agency",
    images: [
      {
        url: "https://fractional.quest/og-finance-recruitment.png",
        width: 1200,
        height: 630,
        alt: "Finance Recruitment Agency - CFO & FD Recruitment Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance Recruitment Agency 🎯 CFO & FD Recruitment",
    description:
      "Find the best finance recruitment agencies for CFO, Finance Director, and FD recruitment.",
  },
  alternates: {
    canonical: "https://fractional.quest/finance-recruitment-agency",
  },
};

const faqItems: FAQItem[] = [
  {
    question: "What is a finance recruitment agency?",
    answer:
      "A finance recruitment agency specialises in placing CFOs, Finance Directors, and other senior finance professionals with companies. They understand financial qualifications (ACA, ACCA, CIMA), sector-specific experience requirements, and can assess candidates for fractional, interim, or permanent roles.",
  },
  {
    question: "How much do finance recruitment agencies charge?",
    answer:
      "Fees typically range from 15-25% of first year salary for permanent roles, or 15-25% of expected annual billings for fractional CFO placements. Retained search for senior finance roles may cost £15,000-£40,000. Some agencies offer flat-fee models for interim placements.",
  },
  {
    question: "What qualifications should a CFO recruiter look for?",
    answer:
      "Top CFO recruiters look for ACA, ACCA, or CIMA qualifications, plus Big 4 or top-tier audit experience. For fractional CFO roles, they also assess portfolio career experience, day rate expectations, and the ability to work with multiple clients simultaneously.",
  },
  {
    question: "How long does it take to hire a CFO through an agency?",
    answer:
      "Typically 3-6 weeks for fractional or interim CFO roles, and 6-12 weeks for permanent CFO positions. Finance recruitment agencies with strong networks can often present shortlisted candidates within 1-2 weeks.",
  },
  {
    question: "What's the difference between a CFO recruiter and a generalist?",
    answer:
      "A specialist CFO recruiter understands finance qualifications, sector experience (PE-backed, VC-backed, public company), technical skills (M&A, fundraising, IPO prep), and can properly assess candidates. Generalist recruiters may not understand the nuances of senior finance roles.",
  },
  {
    question: "Should I use a finance recruitment agency or hire directly?",
    answer:
      "Use a finance recruitment agency if you need speed, access to passive candidates, or are hiring for a specialist role (M&A CFO, PE CFO). Hire directly if you have strong finance networks, want to save fees, or are hiring a junior finance role.",
  },
];

export default function FinanceRecruitmentAgencyPage() {
  return (
    <>
      {/* Preload hero image for faster LCP */}
      <link
        rel="preload"
        href="/images/hero/cfo-mobile.webp"
        as="image"
        type="image/webp"
        media="(max-width: 768px)"
      />
      <link
        rel="preload"
        href="/images/hero/cfo-desktop.webp"
        as="image"
        type="image/webp"
        media="(min-width: 769px)"
      />

      {/* Schema Markup */}
      <WebPageSchema
        title="Finance Recruitment Agency - CFO & Finance Director Recruitment Guide"
        description="Find the best finance recruitment agencies for CFO, Finance Director, and FD recruitment. Compare agencies specialising in fractional, interim, and permanent finance leadership."
        url="https://fractional.quest/finance-recruitment-agency"
        dateModified={new Date("2026-01-30T00:00:00Z")}
      />
      <FAQPageSchema faqs={faqItems} />

      {/* Page Content */}
      <FinanceRecruitmentAgencyClient />
    </>
  );
}
