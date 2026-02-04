import { Metadata } from 'next'
import { PublicLanding } from '@/components/PublicLanding'

export const metadata: Metadata = {
  title: 'Fractional Recruitment Agency UK | Executive Jobs & Hiring',
  description: 'UK fractional recruitment agency specialising in C-suite executives. Browse 200+ fractional CFO, CTO, CMO jobs or hire fractional executives at 10-15% fees vs 25-30% industry standard.',
  openGraph: {
    title: 'Fractional Recruitment Agency UK | Fractional Quest',
    description: 'UK fractional recruitment agency for C-suite executive hiring. 10-15% fees vs 25-30% industry standard. Browse 200+ fractional jobs.',
    url: 'https://fractional.quest',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Fractional Quest - UK Fractional Recruitment Agency',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional Recruitment Agency UK',
    description: 'UK fractional recruitment agency for C-suite executive hiring. Browse 200+ fractional jobs.',
    images: ['https://fractional.quest/og-image.png'],
  },
}

export default function HomePage() {
  return <PublicLanding />
}
