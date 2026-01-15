import { Metadata } from 'next'
import HireFractionalCHROClient from './HireFractionalCHROClient'

export const metadata: Metadata = {
  title: 'Hire a Fractional CHRO | UK Guide',
  description: 'How to hire a fractional CHRO in the UK. Candidates, interview questions, day rates £600-£1,100, contract templates.',
  openGraph: {
    title: 'Hire a Fractional CHRO | UK Guide 2026',
    description: 'How to hire a fractional CHRO in the UK. Find candidates, interview questions, day rates £600-£1,100, and contract templates.',
    url: 'https://fractional.quest/hire-fractional-chro',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Hire a Fractional CHRO - UK Guide',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire a Fractional CHRO | UK Guide 2026',
    description: 'How to hire a fractional CHRO in the UK. Find candidates, interview questions, day rates £600-£1,100, and contract templates.',
    images: ['https://fractional.quest/og-image.png'],
  },
  alternates: {
    canonical: 'https://fractional.quest/hire-fractional-chro',
  },
}

export default function HireFractionalCHROPage() {
  return <HireFractionalCHROClient />
}
