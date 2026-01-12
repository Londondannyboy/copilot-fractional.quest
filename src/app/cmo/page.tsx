import { redirect } from 'next/navigation'

export default function CMORedirect() {
  redirect('/fractional-cmo')
}

export const metadata = {
  title: 'Redirecting to Fractional CMO...',
  robots: 'noindex',
}
