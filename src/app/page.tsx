import { Metadata } from 'next'
import { PublicLanding } from '@/components/PublicLanding'

export const metadata: Metadata = {
  title: 'Fractional Recruitment Agency | Fractional Executive Search Firms',
  description: 'Fractional recruitment agency matching C-suite talent with companies. 200+ fractional CFO, CTO, CMO roles. 10-15% fees vs 25-30% industry standard.',
  keywords: ['fractional recruitment agency', 'fractional executive search firms', 'fractional executive search', 'fractional CFO jobs', 'fractional CTO jobs', 'fractional CMO jobs'],
  openGraph: {
    title: 'Fractional Recruitment Agency | Fractional Executive Search Firms',
    description: 'Fractional recruitment agency matching C-suite talent with companies. 200+ roles. 10-15% fees vs 25-30% industry standard.',
    url: 'https://fractional.quest',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Fractional Quest - Fractional Recruitment Agency',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional Recruitment Agency | Fractional Executive Search Firms',
    description: 'Fractional recruitment agency matching C-suite talent with companies. 200+ roles. 10-15% fees.',
    images: ['https://fractional.quest/og-image.png'],
  },
}

export default function HomePage() {
  return <PublicLanding />
}
