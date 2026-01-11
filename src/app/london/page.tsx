import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fractional Jobs London | Redirect',
  description: 'Redirecting to Fractional Jobs London page',
  robots: {
    index: false,
    follow: true,
  },
}

export default function LondonRedirect() {
  redirect('/fractional-jobs-london')
}
