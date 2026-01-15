import { Metadata } from 'next'
import HireFractionalCEOClient from './HireFractionalCEOClient'

export const metadata: Metadata = {
  title: 'Hire a Fractional CEO | UK Guide',
  description: 'How to hire a fractional CEO in the UK. Candidates, interview questions, day rates £1,000-£2,000, contract templates.',
  openGraph: {
    title: 'Hire a Fractional CEO | UK Guide 2026',
    description: 'How to hire a fractional CEO in the UK. Find candidates, interview questions, day rates £1,000-£2,000, and contract templates.',
    url: 'https://fractional.quest/hire-fractional-ceo',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Hire a Fractional CEO - UK Guide',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire a Fractional CEO | UK Guide 2026',
    description: 'How to hire a fractional CEO in the UK. Find candidates, interview questions, day rates £1,000-£2,000, and contract templates.',
    images: ['https://fractional.quest/og-image.png'],
  },
  alternates: {
    canonical: 'https://fractional.quest/hire-fractional-ceo',
  },
}

export default function HireFractionalCEOPage() {
  return <HireFractionalCEOClient />
}
