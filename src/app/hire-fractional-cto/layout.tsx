import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Hire a Fractional CTO | Complete Guide | Fractional Quest',
  description: 'Step-by-step guide to hiring a fractional CTO. Where to find candidates, what to look for, interview questions, contract terms, and day rates for UK fractional CTOs.',
  alternates: {
    canonical: '/hire-fractional-cto',
  },
}

export default function HireFractionalCTOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
