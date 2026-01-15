import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Hire a Fractional CFO | Complete Guide | Fractional Quest',
  description: 'Step-by-step guide to hiring a fractional CFO. Where to find candidates, what to look for, interview questions, contract terms, and day rates for UK fractional CFOs.',
  alternates: {
    canonical: '/hire-fractional-cfo',
  },
}

export default function HireFractionalCFOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
