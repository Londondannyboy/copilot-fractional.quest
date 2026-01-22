// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { ctoJobsSEO } from "@/lib/seo-content/cto-jobs";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('cto')
const imageAlt = getImage('cto').alt

// SEO Metadata
export const metadata: Metadata = {
  title: ctoJobsSEO.meta.title,
  description: ctoJobsSEO.meta.description,
  keywords: ctoJobsSEO.meta.keywords,
  openGraph: {
    title: ctoJobsSEO.meta.title,
    description: ctoJobsSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-jobs-cto",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: ctoJobsSEO.meta.title,
    description: ctoJobsSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-jobs-cto",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalJobsCTOPage() {
  // Server-side data fetch - "cto" filters by role type
  const { jobs, stats } = await getJobsPageData("cto");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: ctoJobsSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: ctoJobsSEO.meta.title,
    description: ctoJobsSEO.meta.description,
    url: "https://fractional.quest/fractional-jobs-cto",
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
        location="cto"
        locationDisplay="Fractional CTO"
        initialJobs={jobs}
        stats={stats}
        seoContent={ctoJobsSEO}
        imageCategory="cto"
        roleFilter="CTO"
        accentColor="blue"
      />
    </>
  );
}
