import { redirect } from 'next/navigation'

export default function CFORedirect() {
  redirect('/fractional-cfo')
}

export const metadata = {
  title: 'Redirecting to Fractional CFO...',
  robots: 'noindex',
}
