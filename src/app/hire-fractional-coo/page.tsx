import { Metadata } from 'next'
import HireFractionalCOOClient from './HireFractionalCOOClient'

export const metadata: Metadata = {
  title: 'Hire a Fractional COO | UK Guide',
  description: 'How to hire a fractional COO in the UK. Candidates, interview questions, day rates £750-£1,400, contract templates.',
  openGraph: {
    title: 'Hire a Fractional COO | UK Guide 2026',
    description: 'How to hire a fractional COO in the UK. Find candidates, interview questions, day rates £750-£1,400, and contract templates.',
    url: 'https://fractional.quest/hire-fractional-coo',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Hire a Fractional COO - UK Guide',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire a Fractional COO | UK Guide 2026',
    description: 'How to hire a fractional COO in the UK. Find candidates, interview questions, day rates £750-£1,400, and contract templates.',
    images: ['https://fractional.quest/og-image.png'],
  },
  alternates: {
    canonical: 'https://fractional.quest/hire-fractional-coo',
  },
}

export default function HireFractionalCOOPage() {
  return <HireFractionalCOOClient />
}
