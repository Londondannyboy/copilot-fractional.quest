import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You for Registering | Fractional Quest',
  description: 'Thank you for joining our waitlist. We will be in touch when we launch in Q1 2026.',
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-2xl w-full">
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 md:p-12 backdrop-blur text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Thank You for Registering
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            We've received your details and will be in contact in these situations:
          </p>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mb-8 text-left">
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">
                  <strong className="text-white">When we launch in Q1 2026</strong> - You'll be among the first to know
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">
                  <strong className="text-white">If we find a suitable fractional role</strong> that matches your profile before launch
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4 mb-8">
            <p className="text-emerald-300 text-sm">
              <strong>Next Steps:</strong> We'll analyze your public LinkedIn profile to understand your experience and match you with relevant opportunities.
            </p>
          </div>

          <p className="text-gray-400 mb-8">
            In the meantime, feel free to browse our job content library to stay informed about the fractional executive market.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/fractional-jobs-uk"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-colors"
            >
              Browse Jobs
            </Link>
            <Link
              href="/fractional-recruitment-agency"
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-bold transition-colors border border-gray-600"
            >
              Learn About Us
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
