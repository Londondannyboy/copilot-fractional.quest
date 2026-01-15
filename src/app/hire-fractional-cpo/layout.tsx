import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Hire a Fractional CPO | Complete Guide | Fractional Quest',
  description: 'Step-by-step guide to hiring a fractional CPO. Where to find candidates, what to look for, interview questions, contract terms, and day rates for UK fractional CPOs.',
  alternates: {
    canonical: '/hire-fractional-cpo',
  },
}

export default function HireFractionalCPOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
