import { Metadata } from "next";
import { JobPageClient } from "@/components/job-pages";
import { getJobsPageData } from "@/lib/jobs";
import { birminghamSEO } from "@/lib/seo-content/birmingham";

// SEO Metadata
export const metadata: Metadata = {
  title: birminghamSEO.meta.title,
  description: birminghamSEO.meta.description,
  keywords: birminghamSEO.meta.keywords,
  alternates: {
    canonical: "https://fractional.quest/birmingham",
  },
  openGraph: {
    title: birminghamSEO.meta.title,
    description: birminghamSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/birmingham",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function BirminghamJobsPage() {
  // Server-side data fetch
  const { jobs, stats } = await getJobsPageData("birmingham");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: birminghamSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: birminghamSEO.meta.title,
    description: birminghamSEO.meta.description,
    url: "https://fractional.quest/birmingham",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: birminghamSEO.faqs.map((faq) => ({
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
        location="birmingham"
        locationDisplay="Birmingham"
        initialJobs={jobs}
        stats={stats}
        seoContent={birminghamSEO}
      />
    </>
  );
}
