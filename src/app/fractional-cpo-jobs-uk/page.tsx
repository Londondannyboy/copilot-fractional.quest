// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { cpoJobsUkSEO } from "@/lib/seo-content/cpo-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('cpo')
const imageAlt = getImage('cpo').alt

// SEO Metadata
export const metadata: Metadata = {
  title: cpoJobsUkSEO.meta.title,
  description: cpoJobsUkSEO.meta.description,
  keywords: cpoJobsUkSEO.meta.keywords,
  openGraph: {
    title: cpoJobsUkSEO.meta.title,
    description: cpoJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-cpo-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: cpoJobsUkSEO.meta.title,
    description: cpoJobsUkSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-cpo-jobs-uk",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCPOJobsUKPage() {
  // Server-side data fetch - "cpo" filters by role type
  const { jobs, stats } = await getJobsPageData("cpo");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: cpoJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: cpoJobsUkSEO.meta.title,
    description: cpoJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-cpo-jobs-uk",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cpoJobsUkSEO.faqs.map((faq) => ({
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
        location="cpo"
        locationDisplay="Fractional CPO UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={cpoJobsUkSEO}
        imageCategory="cpo"
        roleFilter="CPO"
        accentColor="indigo"
      />
    </>
  );
}
