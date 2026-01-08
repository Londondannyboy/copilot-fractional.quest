import { Metadata } from "next";
import { JobPageClient } from "@/components/job-pages";
import { getJobsPageData } from "@/lib/jobs";
import { edinburghSEO } from "@/lib/seo-content/edinburgh";

// SEO Metadata
export const metadata: Metadata = {
  title: edinburghSEO.meta.title,
  description: edinburghSEO.meta.description,
  keywords: edinburghSEO.meta.keywords,
  alternates: {
    canonical: "https://fractional.quest/edinburgh",
  },
  openGraph: {
    title: edinburghSEO.meta.title,
    description: edinburghSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/edinburgh",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function EdinburghJobsPage() {
  // Server-side data fetch
  const { jobs, stats } = await getJobsPageData("edinburgh");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: edinburghSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: edinburghSEO.meta.title,
    description: edinburghSEO.meta.description,
    url: "https://fractional.quest/edinburgh",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: edinburghSEO.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Page Content */}
      <JobPageClient
        location="edinburgh"
        locationDisplay="Edinburgh"
        initialJobs={jobs}
        stats={stats}
        seoContent={edinburghSEO}
      />
    </>
  );
}
