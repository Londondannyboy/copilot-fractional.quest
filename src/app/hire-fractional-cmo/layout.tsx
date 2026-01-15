import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Hire a Fractional CMO | Complete Guide | Fractional Quest',
  description: 'Step-by-step guide to hiring a fractional CMO. Where to find candidates, what to look for, interview questions, contract terms, and day rates for UK fractional CMOs.',
  alternates: {
    canonical: '/hire-fractional-cmo',
  },
}

export default function HireFractionalCMOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
