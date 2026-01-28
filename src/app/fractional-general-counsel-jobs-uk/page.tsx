import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { gcJobsUkSEO } from "@/lib/seo-content/gc-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('default')
const imageAlt = getImage('default').alt

export const metadata: Metadata = {
  title: gcJobsUkSEO.meta.title,
  description: gcJobsUkSEO.meta.description,
  keywords: gcJobsUkSEO.meta.keywords,
  openGraph: {
    title: gcJobsUkSEO.meta.title,
    description: gcJobsUkSEO.meta.description,
    url: "https://fractional.quest/fractional-general-counsel-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  alternates: { canonical: "/fractional-general-counsel-jobs-uk" },
};

export const revalidate = 3600;

export default async function FractionalGCJobsUKPage() {
  const { jobs, stats } = await getJobsPageData("legal");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: gcJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: gcJobsUkSEO.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <IntelligentJobPageClient
        location="gc"
        locationDisplay="Fractional General Counsel UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={gcJobsUkSEO}
        imageCategory="default"
        roleFilter="Legal"
        accentColor="indigo"
      />
    </>
  );
}
