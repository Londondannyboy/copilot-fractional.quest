// NZ international pages - reads from Neon pages table
// Handles /nz/fractional-cfo-jobs, /nz/fractional-cto-jobs, etc.

import { Metadata } from 'next'
import { getAllPageSlugs } from '@/lib/pages'
import { generateInternationalMetadata, InternationalPageContent } from '@/lib/international-page'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for NZ pages
export async function generateStaticParams() {
  const allSlugs = await getAllPageSlugs()

  return allSlugs
    .filter(slug => slug.startsWith('nz-'))
    .map(slug => ({ slug: slug.substring(3) })) // Remove "nz-" prefix
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return generateInternationalMetadata('nz', slug)
}

// Revalidate every hour
export const revalidate = 3600

export default async function NZPage({ params }: PageProps) {
  const { slug } = await params
  return <InternationalPageContent locale="nz" slug={slug} />
}
