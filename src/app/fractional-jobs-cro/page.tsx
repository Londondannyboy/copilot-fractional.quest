// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { croJobsSEO } from "@/lib/seo-content/cro-jobs";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('cro')
const imageAlt = getImage('cro').alt

// SEO Metadata
export const metadata: Metadata = {
  title: croJobsSEO.meta.title,
  description: croJobsSEO.meta.description,
  keywords: croJobsSEO.meta.keywords,
  openGraph: {
    title: croJobsSEO.meta.title,
    description: croJobsSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-jobs-cro",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: croJobsSEO.meta.title,
    description: croJobsSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-jobs-cro",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalJobsCROPage() {
  // Server-side data fetch - "cro" filters by role type
  const { jobs, stats } = await getJobsPageData("cro");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: croJobsSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: croJobsSEO.meta.title,
    description: croJobsSEO.meta.description,
    url: "https://fractional.quest/fractional-jobs-cro",
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
        location="cro"
        locationDisplay="Fractional CRO"
        initialJobs={jobs}
        stats={stats}
        seoContent={croJobsSEO}
        imageCategory="cro"
        roleFilter="CRO"
        accentColor="amber"
      />
    </>
  );
}
