import { Metadata } from 'next'
import HireFractionalCROClient from './HireFractionalCROClient'

export const metadata: Metadata = {
  title: 'Hire a Fractional CRO | UK Guide',
  description: 'How to hire a fractional CRO in the UK. Candidates, interview questions, day rates £1,000-£1,500, contract templates.',
  openGraph: {
    title: 'Hire a Fractional CRO | UK Guide 2026',
    description: 'How to hire a fractional CRO in the UK. Find candidates, interview questions, day rates £1,000-£1,500, and contract templates.',
    url: 'https://fractional.quest/hire-fractional-cro',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Hire a Fractional CRO - UK Guide',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire a Fractional CRO | UK Guide 2026',
    description: 'How to hire a fractional CRO in the UK. Find candidates, interview questions, day rates £1,000-£1,500, and contract templates.',
    images: ['https://fractional.quest/og-image.png'],
  },
  alternates: {
    canonical: 'https://fractional.quest/hire-fractional-cro',
  },
}

export default function HireFractionalCROPage() {
  return <HireFractionalCROClient />
}
