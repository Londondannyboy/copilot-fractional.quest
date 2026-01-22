// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { cmoJobsSEO } from "@/lib/seo-content/cmo-jobs";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('cmo')
const imageAlt = getImage('cmo').alt

// SEO Metadata
export const metadata: Metadata = {
  title: cmoJobsSEO.meta.title,
  description: cmoJobsSEO.meta.description,
  keywords: cmoJobsSEO.meta.keywords,
  openGraph: {
    title: cmoJobsSEO.meta.title,
    description: cmoJobsSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-jobs-cmo",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: cmoJobsSEO.meta.title,
    description: cmoJobsSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-jobs-cmo",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalJobsCMOPage() {
  // Server-side data fetch - "cmo" filters by role type
  const { jobs, stats } = await getJobsPageData("cmo");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: cmoJobsSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: cmoJobsSEO.meta.title,
    description: cmoJobsSEO.meta.description,
    url: "https://fractional.quest/fractional-jobs-cmo",
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
        location="cmo"
        locationDisplay="Fractional CMO"
        initialJobs={jobs}
        stats={stats}
        seoContent={cmoJobsSEO}
        imageCategory="cmo"
        roleFilter="CMO"
        accentColor="amber"
      />
    </>
  );
}
