import { Metadata } from 'next'
import HireFractionalCISOClient from './HireFractionalCISOClient'

export const metadata: Metadata = {
  title: 'Hire a Fractional CISO | UK Guide',
  description: 'How to hire a fractional CISO in the UK. Candidates, interview questions, day rates £900-£1,500, contract templates.',
  openGraph: {
    title: 'Hire a Fractional CISO | UK Guide 2026',
    description: 'How to hire a fractional CISO in the UK. Find candidates, interview questions, day rates £900-£1,500, and contract templates.',
    url: 'https://fractional.quest/hire-fractional-ciso',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Hire a Fractional CISO - UK Guide',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire a Fractional CISO | UK Guide 2026',
    description: 'How to hire a fractional CISO in the UK. Find candidates, interview questions, day rates £900-£1,500, and contract templates.',
    images: ['https://fractional.quest/og-image.png'],
  },
  alternates: {
    canonical: 'https://fractional.quest/hire-fractional-ciso',
  },
}

export default function HireFractionalCISOPage() {
  return <HireFractionalCISOClient />
}
