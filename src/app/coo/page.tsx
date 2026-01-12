import { redirect } from 'next/navigation'

export default function COORedirect() {
  redirect('/fractional-coo')
}

export const metadata = {
  title: 'Redirecting to Fractional COO...',
  robots: 'noindex',
}
