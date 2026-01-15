import { Metadata } from 'next'
import HireFractionalCPOClient from './HireFractionalCPOClient'

export const metadata: Metadata = {
  title: 'Hire a Fractional CPO | UK Guide',
  description: 'How to hire a fractional CPO in the UK. Candidates, interview questions, day rates £800-£1,400, contract templates.',
  openGraph: {
    title: 'Hire a Fractional CPO | UK Guide 2026',
    description: 'How to hire a fractional CPO in the UK. Find candidates, interview questions, day rates £800-£1,400, and contract templates.',
    url: 'https://fractional.quest/hire-fractional-cpo',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Hire a Fractional CPO - UK Guide',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire a Fractional CPO | UK Guide 2026',
    description: 'How to hire a fractional CPO in the UK. Find candidates, interview questions, day rates £800-£1,400, and contract templates.',
    images: ['https://fractional.quest/og-image.png'],
  },
  alternates: {
    canonical: 'https://fractional.quest/hire-fractional-cpo',
  },
}

export default function HireFractionalCPOPage() {
  return <HireFractionalCPOClient />
}
