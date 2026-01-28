import { Metadata } from "next";
import { IntelligentJobPageClient } from "@/components/job-pages/IntelligentJobPageClient";
import { getJobsPageData } from "@/lib/jobs";
import { fdJobsUkSEO } from "@/lib/seo-content/fd-jobs-uk";
import { getOGImageUrl, getImage } from "@/lib/images";

const ogImage = getOGImageUrl('finance')
const imageAlt = getImage('finance').alt

export const metadata: Metadata = {
  title: fdJobsUkSEO.meta.title,
  description: fdJobsUkSEO.meta.description,
  keywords: fdJobsUkSEO.meta.keywords,
  openGraph: {
    title: fdJobsUkSEO.meta.title,
    description: fdJobsUkSEO.meta.description,
    type: "website",
    url: "https://fractional.quest/fractional-finance-director-jobs-uk",
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  alternates: { canonical: "/fractional-finance-director-jobs-uk" },
};

export const revalidate = 3600;

export default async function FractionalFDJobsUKPage() {
  const { jobs, stats } = await getJobsPageData("finance");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fdJobsUkSEO.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fractional.quest${item.url}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fdJobsUkSEO.faqs.map((faq) => ({
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
        location="fd"
        locationDisplay="Fractional Finance Director UK"
        initialJobs={jobs}
        stats={stats}
        seoContent={fdJobsUkSEO}
        imageCategory="finance"
        roleFilter="Finance Director"
        accentColor="emerald"
      />
    </>
  );
}
