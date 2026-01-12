import { redirect } from 'next/navigation'

export default function CTORedirect() {
  redirect('/fractional-cto')
}

export const metadata = {
  title: 'Redirecting to Fractional CTO...',
  robots: 'noindex',
}
