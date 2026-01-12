import { redirect } from 'next/navigation'

export default function CPORedirect() {
  redirect('/fractional-cpo')
}

export const metadata = {
  title: 'Redirecting to Fractional CPO...',
  robots: 'noindex',
}
