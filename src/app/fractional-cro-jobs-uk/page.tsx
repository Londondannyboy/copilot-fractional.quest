// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { croJobsUkSEO } from "@/lib/seo-content/cro-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('cro')
const imageAlt = getImage('cro').alt

// SEO Metadata
export const metadata: Metadata = {
  title: croJobsUkSEO.meta.title,
  description: croJobsUkSEO.meta.description,
  keywords: croJobsUkSEO.meta.keywords,
  openGraph: {
    title: croJobsUkSEO.meta.title,
    description: croJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-cro-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: croJobsUkSEO.meta.title,
    description: croJobsUkSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-cro-jobs-uk",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCROJobsUKPage() {
  // Server-side data fetch - "sales" filters by role type (CRO is in Sales category)
  const { jobs, stats } = await getJobsPageData("sales");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: croJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: croJobsUkSEO.meta.title,
    description: croJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-cro-jobs-uk",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
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

      {/* Page Content - Using IntelligentDocument pattern for reactive updates */}
      <IntelligentJobPageClient
        location="cro"
        locationDisplay="Fractional CRO UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={croJobsUkSEO}
        imageCategory="cro"
        roleFilter="CRO"
        accentColor="blue"
      />
    </>
  );
}
