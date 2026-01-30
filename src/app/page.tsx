import { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Fractional Executive Jobs UK | AI-Powered Job Search',
  description: 'Find fractional executive jobs in the UK. AI-powered search for CFO, CTO, CMO, COO, CISO roles. Day rates £600-£2,000. Browse 200+ live opportunities.',
  openGraph: {
    title: 'Fractional Executive Jobs UK | Fractional Quest',
    description: 'Find fractional executive jobs in the UK. AI-powered search for CFO, CTO, CMO, COO, CISO roles.',
    url: 'https://fractional.quest',
    siteName: 'Fractional Quest',
    type: 'website',
    images: [{
      url: 'https://fractional.quest/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Fractional Quest - UK Fractional Executive Jobs',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional Executive Jobs UK',
    description: 'Find fractional executive jobs in the UK. AI-powered search for CFO, CTO, CMO, COO, CISO roles.',
    images: ['https://fractional.quest/og-image.png'],
  },
}

export default function HomePage() {
  return <HomePageClient />
}
