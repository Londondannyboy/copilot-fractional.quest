// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { cisoJobsSEO } from "@/lib/seo-content/ciso-jobs";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('ciso')
const imageAlt = getImage('ciso').alt

// SEO Metadata
export const metadata: Metadata = {
  title: cisoJobsSEO.meta.title,
  description: cisoJobsSEO.meta.description,
  keywords: cisoJobsSEO.meta.keywords,
  openGraph: {
    title: cisoJobsSEO.meta.title,
    description: cisoJobsSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-jobs-ciso",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: cisoJobsSEO.meta.title,
    description: cisoJobsSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-jobs-ciso",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalJobsCISOPage() {
  // Server-side data fetch - "ciso" filters by role type
  const { jobs, stats } = await getJobsPageData("ciso");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: cisoJobsSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: cisoJobsSEO.meta.title,
    description: cisoJobsSEO.meta.description,
    url: "https://fractional.quest/fractional-jobs-ciso",
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
        location="ciso"
        locationDisplay="Fractional CISO"
        initialJobs={jobs}
        stats={stats}
        seoContent={cisoJobsSEO}
        imageCategory="ciso"
        roleFilter="CISO"
        accentColor="red"
      />
    </>
  );
}
