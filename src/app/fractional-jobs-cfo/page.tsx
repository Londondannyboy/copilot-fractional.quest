// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { cfoJobsSEO } from "@/lib/seo-content/cfo-jobs";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('cfo')
const imageAlt = getImage('cfo').alt

// SEO Metadata
export const metadata: Metadata = {
  title: cfoJobsSEO.meta.title,
  description: cfoJobsSEO.meta.description,
  keywords: cfoJobsSEO.meta.keywords,
  openGraph: {
    title: cfoJobsSEO.meta.title,
    description: cfoJobsSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-jobs-cfo",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: cfoJobsSEO.meta.title,
    description: cfoJobsSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-jobs-cfo",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalJobsCFOPage() {
  // Server-side data fetch - "cfo" filters by role type
  const { jobs, stats } = await getJobsPageData("cfo");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: cfoJobsSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: cfoJobsSEO.meta.title,
    description: cfoJobsSEO.meta.description,
    url: "https://fractional.quest/fractional-jobs-cfo",
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

      {/* Page Content */}
      <IntelligentJobPageClient
        location="cfo"
        locationDisplay="Fractional CFO"
        initialJobs={jobs}
        stats={stats}
        seoContent={cfoJobsSEO}
        imageCategory="cfo"
        roleFilter="CFO"
        accentColor="emerald"
      />
    </>
  );
}
