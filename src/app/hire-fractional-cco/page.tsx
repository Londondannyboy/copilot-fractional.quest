import { Metadata } from 'next'
import HireFractionalCCOClient from './HireFractionalCCOClient'

export const metadata: Metadata = {
  title: 'Hire a Fractional CCO | UK Guide',
  description: 'How to hire a fractional CCO in the UK. Candidates, interview questions, day rates £800-£1,200, contract templates.',
  openGraph: {
    title: 'Hire a Fractional CCO | UK Guide 2026',
    description: 'How to hire a fractional CCO in the UK. Find candidates, interview questions, day rates £800-£1,200, and contract templates.',
    url: 'https://fractional.quest/hire-fractional-cco',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Hire a Fractional CCO - UK Guide',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire a Fractional CCO | UK Guide 2026',
    description: 'How to hire a fractional CCO in the UK. Find candidates, interview questions, day rates £800-£1,200, and contract templates.',
    images: ['https://fractional.quest/og-image.png'],
  },
  alternates: {
    canonical: 'https://fractional.quest/hire-fractional-cco',
  },
}

export default function HireFractionalCCOPage() {
  return <HireFractionalCCOClient />
}
