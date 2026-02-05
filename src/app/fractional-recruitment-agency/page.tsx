import { Metadata } from "next";
import { neon } from "@neondatabase/serverless";
import { RecruitmentAgencyClient } from "./RecruitmentAgencyClient";
import { WebPageSchema, FAQPageSchema, FAQItem, EmploymentAgencySchema, JobListingSchema } from "@/components/seo";

// Fetch jobs for JobPosting schema (Google for Jobs)
async function getJobsForSchema() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, city, country, is_remote,
             compensation, role_category, skills_required, posted_date, description_snippet
      FROM jobs
      WHERE is_active = true AND is_fractional = true
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 10
    `;
    return jobs;
  } catch (error) {
    console.error('[fractional-recruitment-agency] Error fetching jobs for schema:', error);
    return [];
  }
}

// SEO Metadata - optimized for "fractional recruitment agency" and "fractional recruiter" keywords
export const metadata: Metadata = {
  title: "Fractional Recruitment Agency 🎯 Fractional Recruiter",
  description:
    "Find the best fractional recruitment agencies and fractional recruiters. Compare specialist agencies for fractional CFO, CTO, CMO, and C-suite placements. Agency fees 15-25%, placements in 2-4 weeks.",
  keywords: [
    "fractional recruitment agency",
    "fractional recruiter",
    "fractional recruitment agencies",
    "fractional executive recruitment",
    "fractional cfo recruitment",
    "fractional cto recruitment",
    "fractional cmo recruitment",
    "interim executive recruitment",
    "part time executive recruitment",
    "fractional c-suite recruitment",
    "executive recruiter",
  ],
  openGraph: {
    title: "Fractional Recruitment Agency 🎯 Fractional Recruiter",
    description:
      "Find the best fractional recruitment agencies and fractional recruiters. Compare specialists in CFO, CTO, CMO placements. Fees 15-25%, placements in 2-4 weeks.",
    type: "website",
    url: "https://fractional.quest/fractional-recruitment-agency",
    images: [
      {
        url: "https://fractional.quest/og-recruitment-agency.png",
        width: 1200,
        height: 630,
        alt: "Fractional Recruitment Agency - Best Agencies & Recruiters Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fractional Recruitment Agency 🎯 Fractional Recruiter",
    description:
      "Find the best fractional recruitment agencies and fractional recruiters. Compare specialists in CFO, CTO, CMO placements.",
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

export default async function FractionalRecruitmentAgencyPage() {
  // Fetch jobs server-side for JobPosting schema (Google for Jobs)
  const jobs = await getJobsForSchema();

  return (
    <>
      {/* Preload hero image for faster LCP - WebP format */}
      <link
        rel="preload"
        href="/images/hero/fractional-recruitment-agency-mobile.webp"
        as="image"
        type="image/webp"
        media="(max-width: 768px)"
      />
      <link
        rel="preload"
        href="/images/hero/fractional-recruitment-agency-desktop.webp"
        as="image"
        type="image/webp"
        media="(min-width: 769px)"
      />

      {/* Schema Markup - EmploymentAgency tells Google we ARE a recruitment agency */}
      <EmploymentAgencySchema
        name="Fractional Quest"
        description="UK's leading fractional recruitment agency and job board. Specializing in fractional CFO, CTO, CMO, COO, and C-suite executive placements. Lower fees than traditional recruiters."
        url="https://fractional.quest/fractional-recruitment-agency"
        serviceTypes={[
          "Fractional Executive Recruitment",
          "Fractional CFO Recruitment",
          "Fractional CTO Recruitment",
          "Fractional CMO Recruitment",
          "Fractional COO Recruitment",
          "Fractional CISO Recruitment",
          "Interim Executive Search",
          "Part-Time Executive Placement",
        ]}
      />
      <WebPageSchema
        title="Fractional Recruitment Agency UK | Fractional Recruiter & Executive Search"
        description="UK's leading fractional recruitment agency. Find fractional CFO, CTO, CMO recruiters. 10-15% fees vs 25-30% industry standard. 200+ executives, placements in 2-4 weeks."
        url="https://fractional.quest/fractional-recruitment-agency"
        dateModified={new Date()}
      />
      <FAQPageSchema faqs={faqItems} />

      {/* JobPosting Schema - tells Google about available jobs (Google for Jobs) */}
      {jobs.length > 0 && (
        <JobListingSchema
          jobs={jobs.map((job: any) => ({
            id: job.id,
            slug: job.slug,
            title: job.title,
            company_name: job.company_name || 'Confidential',
            location: job.location,
            city: job.city,
            country: job.country,
            is_remote: job.is_remote,
            compensation: job.compensation,
            role_category: job.role_category,
            skills_required: job.skills_required,
            posted_date: job.posted_date,
            description_snippet: job.description_snippet,
          }))}
          pageUrl="https://fractional.quest/fractional-recruitment-agency"
        />
      )}

      {/* Page Content */}
      <RecruitmentAgencyClient />
    </>
  );
}
