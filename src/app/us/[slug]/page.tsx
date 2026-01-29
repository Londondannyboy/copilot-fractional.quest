// US international pages - reads from Neon pages table
// Handles /us/fractional-cfo-jobs, /us/fractional-cto-jobs, etc.

import { Metadata } from 'next'
import { getAllPageSlugs } from '@/lib/pages'
import { generateInternationalMetadata, InternationalPageContent } from '@/lib/international-page'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for US pages
export async function generateStaticParams() {
  const allSlugs = await getAllPageSlugs()

  return allSlugs
    .filter(slug => slug.startsWith('us-'))
    .map(slug => ({ slug: slug.substring(3) })) // Remove "us-" prefix
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return generateInternationalMetadata('us', slug)
}

// Revalidate every hour
export const revalidate = 3600

export default async function USPage({ params }: PageProps) {
  const { slug } = await params
  return <InternationalPageContent locale="us" slug={slug} />
}
