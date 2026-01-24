// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { csoJobsUkSEO } from "@/lib/seo-content/cso-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('cso')
const imageAlt = getImage('cso').alt

// SEO Metadata
export const metadata: Metadata = {
  title: csoJobsUkSEO.meta.title,
  description: csoJobsUkSEO.meta.description,
  keywords: csoJobsUkSEO.meta.keywords,
  openGraph: {
    title: csoJobsUkSEO.meta.title,
    description: csoJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-cso-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: csoJobsUkSEO.meta.title,
    description: csoJobsUkSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-cso-jobs-uk",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCSOJobsUKPage() {
  // Server-side data fetch - "strategy" filters by role type
  const { jobs, stats } = await getJobsPageData("strategy");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: csoJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: csoJobsUkSEO.meta.title,
    description: csoJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-cso-jobs-uk",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: csoJobsUkSEO.faqs.map((faq) => ({
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
        location="cso"
        locationDisplay="Fractional CSO UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={csoJobsUkSEO}
        imageCategory="cso"
        roleFilter="CSO"
        accentColor="indigo"
      />
    </>
  );
}
