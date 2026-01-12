import { redirect } from 'next/navigation'

export default function CRORedirect() {
  redirect('/fractional-cro')
}

export const metadata = {
  title: 'Redirecting to Fractional CRO...',
  robots: 'noindex',
}
