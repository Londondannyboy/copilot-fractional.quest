// AU international pages - reads from Neon pages table
// Handles /au/fractional-cfo-jobs, /au/fractional-cto-jobs, etc.

import { Metadata } from 'next'
import { getAllPageSlugs } from '@/lib/pages'
import { generateInternationalMetadata, InternationalPageContent } from '@/lib/international-page'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for AU pages
export async function generateStaticParams() {
  const allSlugs = await getAllPageSlugs()

  return allSlugs
    .filter(slug => slug.startsWith('au-'))
    .map(slug => ({ slug: slug.substring(3) })) // Remove "au-" prefix
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return generateInternationalMetadata('au', slug)
}

// Revalidate every hour
export const revalidate = 3600

export default async function AUPage({ params }: PageProps) {
  const { slug } = await params
  return <InternationalPageContent locale="au" slug={slug} />
}
