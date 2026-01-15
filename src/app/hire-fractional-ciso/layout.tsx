import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Hire a Fractional CISO | Complete Guide | Fractional Quest',
  description: 'Step-by-step guide to hiring a fractional CISO. Where to find candidates, what to look for, interview questions, contract terms, and day rates for UK fractional CISOs.',
  alternates: {
    canonical: '/hire-fractional-ciso',
  },
}

export default function HireFractionalCISOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
