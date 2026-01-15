import { Metadata } from 'next'
import HireFractionalCMOClient from './HireFractionalCMOClient'

export const metadata: Metadata = {
  title: 'Hire a Fractional CMO | UK Guide',
  description: 'How to hire a fractional CMO in the UK. Candidates, interview questions, day rates £700-£1,400, contract templates.',
  openGraph: {
    title: 'Hire a Fractional CMO | UK Guide 2026',
    description: 'How to hire a fractional CMO in the UK. Find candidates, interview questions, day rates £700-£1,400, and contract templates.',
    url: 'https://fractional.quest/hire-fractional-cmo',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Hire a Fractional CMO - UK Guide',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire a Fractional CMO | UK Guide 2026',
    description: 'How to hire a fractional CMO in the UK. Find candidates, interview questions, day rates £700-£1,400, and contract templates.',
    images: ['https://fractional.quest/og-image.png'],
  },
  alternates: {
    canonical: 'https://fractional.quest/hire-fractional-cmo',
  },
}

export default function HireFractionalCMOPage() {
  return <HireFractionalCMOClient />
}
