import { Metadata } from 'next'
import HireFractionalCFOClient from './HireFractionalCFOClient'

export const metadata: Metadata = {
  title: 'Hire a Fractional CFO | UK Guide',
  description: 'How to hire a fractional CFO in the UK. Candidates, interview questions, day rates £800-£1,500, contract templates.',
  openGraph: {
    title: 'Hire a Fractional CFO | UK Guide 2026',
    description: 'How to hire a fractional CFO in the UK. Find candidates, interview questions, day rates £800-£1,500, and contract templates.',
    url: 'https://fractional.quest/hire-fractional-cfo',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Hire a Fractional CFO - UK Guide',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire a Fractional CFO | UK Guide 2026',
    description: 'How to hire a fractional CFO in the UK. Find candidates, interview questions, day rates £800-£1,500, and contract templates.',
    images: ['https://fractional.quest/og-image.png'],
  },
  alternates: {
    canonical: 'https://fractional.quest/hire-fractional-cfo',
  },
}

export default function HireFractionalCFOPage() {
  return <HireFractionalCFOClient />
}
