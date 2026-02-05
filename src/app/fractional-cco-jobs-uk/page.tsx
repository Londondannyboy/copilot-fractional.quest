// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { ccoJobsUkSEO } from "@/lib/seo-content/cco-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('sales')
const imageAlt = getImage('sales').alt

// SEO Metadata
export const metadata: Metadata = {
  title: ccoJobsUkSEO.meta.title,
  description: ccoJobsUkSEO.meta.description,
  keywords: ccoJobsUkSEO.meta.keywords,
  openGraph: {
    title: ccoJobsUkSEO.meta.title,
    description: ccoJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-cco-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: ccoJobsUkSEO.meta.title,
    description: ccoJobsUkSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-cco-jobs-uk",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCCOJobsUKPage() {
  // Server-side data fetch - "sales" filters by role type (CCO is in Sales category)
  const { jobs, stats } = await getJobsPageData("sales");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: ccoJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: ccoJobsUkSEO.meta.title,
    description: ccoJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-cco-jobs-uk",
    datePublished: "2024-06-01T00:00:00Z",
    dateModified: "2026-02-05T00:00:00Z",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ccoJobsUkSEO.faqs.map((faq) => ({
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

      {/* Page Content - Using IntelligentDocument pattern for reactive updates */}
      <IntelligentJobPageClient
        location="cco"
        locationDisplay="Fractional CCO UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={ccoJobsUkSEO}
        imageCategory="sales"
        roleFilter="CCO"
        accentColor="blue"
      />
    </>
  );
}
