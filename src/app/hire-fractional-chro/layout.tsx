import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Hire a Fractional CHRO | Complete Guide | Fractional Quest',
  description: 'Step-by-step guide to hiring a fractional CHRO. Where to find candidates, what to look for, interview questions, contract terms, and day rates for UK fractional CHROs.',
  alternates: {
    canonical: '/hire-fractional-chro',
  },
}

export default function HireFractionalCHROLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
