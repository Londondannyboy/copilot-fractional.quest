import { Metadata } from "next";
import { JobPageClient } from "@/components/job-pages";
import { getJobsPageData } from "@/lib/jobs";
import { bristolSEO } from "@/lib/seo-content/bristol";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('bristol')
const imageAlt = getImage('bristol').alt

// SEO Metadata
export const metadata: Metadata = {
  title: bristolSEO.meta.title,
  description: bristolSEO.meta.description,
  keywords: bristolSEO.meta.keywords,
  alternates: {
    canonical: "https://fractional.quest/bristol",
  },
  openGraph: {
    title: bristolSEO.meta.title,
    description: bristolSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/bristol",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: bristolSEO.meta.title,
    description: bristolSEO.meta.description,
    images: [ogImage],
  },
};

// Revalidate every hour for fresh job data
export const revalidate = 3600;

export default async function BristolJobsPage() {
  // Server-side data fetch
  const { jobs, stats } = await getJobsPageData("bristol");

  // Schema markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: bristolSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: bristolSEO.meta.title,
    description: bristolSEO.meta.description,
    url: "https://fractional.quest/bristol",
    isPartOf: {
      "@type": "WebSite",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: bristolSEO.faqs.map((faq) => ({
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

      {/* Page Content */}
      <JobPageClient
        location="bristol"
        locationDisplay="Bristol"
        initialJobs={jobs}
        stats={stats}
        seoContent={bristolSEO}
        imageCategory="bristol"
      />
    </>
  );
}
