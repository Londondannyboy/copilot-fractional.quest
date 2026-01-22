// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { cpoJobsSEO } from "@/lib/seo-content/cpo-jobs";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('cpo')
const imageAlt = getImage('cpo').alt

// SEO Metadata
export const metadata: Metadata = {
  title: cpoJobsSEO.meta.title,
  description: cpoJobsSEO.meta.description,
  keywords: cpoJobsSEO.meta.keywords,
  openGraph: {
    title: cpoJobsSEO.meta.title,
    description: cpoJobsSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-jobs-cpo",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: cpoJobsSEO.meta.title,
    description: cpoJobsSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-jobs-cpo",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalJobsCPOPage() {
  // Server-side data fetch - "cpo" filters by role type
  const { jobs, stats } = await getJobsPageData("cpo");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: cpoJobsSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: cpoJobsSEO.meta.title,
    description: cpoJobsSEO.meta.description,
    url: "https://fractional.quest/fractional-jobs-cpo",
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
        location="cpo"
        locationDisplay="Fractional CPO"
        initialJobs={jobs}
        stats={stats}
        seoContent={cpoJobsSEO}
        imageCategory="cpo"
        roleFilter="CPO"
        accentColor="indigo"
      />
    </>
  );
}
