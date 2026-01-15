import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Hire a Fractional COO | Complete Guide | Fractional Quest',
  description: 'Step-by-step guide to hiring a fractional COO. Where to find candidates, what to look for, interview questions, contract terms, and day rates for UK fractional COOs.',
  alternates: {
    canonical: '/hire-fractional-coo',
  },
}

export default function HireFractionalCOOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
