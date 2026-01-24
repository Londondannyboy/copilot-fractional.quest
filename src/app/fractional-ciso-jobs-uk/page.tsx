// Static route - takes precedence over [slug] dynamic route
import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { cisoJobsUkSEO } from "@/lib/seo-content/ciso-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('ciso')
const imageAlt = getImage('ciso').alt

// SEO Metadata
export const metadata: Metadata = {
  title: cisoJobsUkSEO.meta.title,
  description: cisoJobsUkSEO.meta.description,
  keywords: cisoJobsUkSEO.meta.keywords,
  openGraph: {
    title: cisoJobsUkSEO.meta.title,
    description: cisoJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-ciso-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: cisoJobsUkSEO.meta.title,
    description: cisoJobsUkSEO.meta.description,
    images: [ogImage],
  },
  alternates: {
    canonical: "/fractional-ciso-jobs-uk",
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function FractionalCISOJobsUKPage() {
  // Server-side data fetch - "ciso" filters by role type
  const { jobs, stats } = await getJobsPageData("ciso");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: cisoJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: cisoJobsUkSEO.meta.title,
    description: cisoJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-ciso-jobs-uk",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cisoJobsUkSEO.faqs.map((faq) => ({
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
        location="ciso"
        locationDisplay="Fractional CISO UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={cisoJobsUkSEO}
        imageCategory="ciso"
        roleFilter="CISO"
        accentColor="red"
      />
    </>
  );
}
