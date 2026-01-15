import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Hire a Fractional CEO | Complete Guide | Fractional Quest',
  description: 'Step-by-step guide to hiring a fractional CEO. Where to find candidates, what to look for, interview questions, contract terms, and day rates for UK fractional CEOs.',
  alternates: {
    canonical: '/hire-fractional-ceo',
  },
}

export default function HireFractionalCEOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
