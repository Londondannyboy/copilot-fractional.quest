import { Metadata } from 'next'
import HireFractionalCTOClient from './HireFractionalCTOClient'

export const metadata: Metadata = {
  title: 'Hire a Fractional CTO | UK Guide',
  description: 'How to hire a fractional CTO in the UK. Candidates, interview questions, day rates £900-£1,600, contract templates.',
  openGraph: {
    title: 'Hire a Fractional CTO | UK Guide 2026',
    description: 'How to hire a fractional CTO in the UK. Find candidates, interview questions, day rates £900-£1,600, and contract templates.',
    url: 'https://fractional.quest/hire-fractional-cto',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Hire a Fractional CTO - UK Guide',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire a Fractional CTO | UK Guide 2026',
    description: 'How to hire a fractional CTO in the UK. Find candidates, interview questions, day rates £900-£1,600, and contract templates.',
    images: ['https://fractional.quest/og-image.png'],
  },
  alternates: {
    canonical: 'https://fractional.quest/hire-fractional-cto',
  },
}

export default function HireFractionalCTOPage() {
  return <HireFractionalCTOClient />
}
