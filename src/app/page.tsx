import { Metadata } from 'next'
import { PublicLanding } from '@/components/PublicLanding'

export const metadata: Metadata = {
  title: 'Fractional Recruitment Agency UK | Fractional Executive Search Firm',
  description: 'UK\'s leading fractional recruitment agency and fractional executive search firm. Browse 200+ fractional CFO, CTO, CMO jobs or hire fractional executives at 10-15% fees vs 25-30% industry standard.',
  keywords: ['fractional recruitment agency', 'fractional executive search firm', 'fractional executive search firms', 'fractional recruiter UK', 'fractional CFO jobs', 'fractional CTO jobs'],
  openGraph: {
    title: 'Fractional Recruitment Agency UK | Fractional Executive Search Firm',
    description: 'UK\'s leading fractional recruitment agency and fractional executive search firm. 10-15% fees vs 25-30% industry standard. Browse 200+ fractional jobs.',
    url: 'https://fractional.quest',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Fractional Quest - UK Fractional Recruitment Agency & Executive Search Firm',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional Recruitment Agency UK | Executive Search Firm',
    description: 'UK\'s leading fractional recruitment agency and fractional executive search firm. Browse 200+ fractional jobs.',
    images: ['https://fractional.quest/og-image.png'],
  },
}

export default function HomePage() {
  return <PublicLanding />
}
