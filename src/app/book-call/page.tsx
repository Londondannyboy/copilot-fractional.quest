import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Book a Call with Dan | Fractional Quest',
  description: 'Schedule a free consultation to discuss your fractional executive hiring needs or career goals with Dan Keegan, founder of Fractional Quest.',
}

export default function BookCallPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Compact Hero */}
      <section className="bg-gradient-to-br from-orange-500 via-rose-500 to-purple-600 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Image
              src="/dan-keegan.webp"
              alt="Dan Keegan - Founder of Fractional Quest"
              width={100}
              height={100}
              className="rounded-full border-4 border-white/30 shadow-2xl object-cover"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">Book a Free 30-Min Call</h1>
              <p className="text-white/90">
                With <strong>Dan Keegan</strong> — Fractional Executive & Founder
              </p>
              <p className="text-white/70 text-sm mt-1">
                15+ years helping executives build portfolio careers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - 2 Column Layout */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Left Column - Context (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* What We'll Discuss */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">💬</span>
                  What We&apos;ll Discuss
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">Your career goals or hiring needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">Market rates and positioning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">Actionable next steps</span>
                  </li>
                </ul>
              </div>

              {/* For Employers */}
              <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🎯</span> For Employers
                </h3>
                <p className="text-gray-600 text-sm">
                  Discuss your fractional hiring needs, get matched with vetted executives,
                  and understand pricing models. No commitment required.
                </p>
              </div>

              {/* For Candidates */}
              <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>💼</span> For Candidates
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore fractional opportunities, get career guidance,
                  and receive personalized recommendations for your journey.
                </p>
              </div>

              {/* Alternative Contact */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Prefer another way?</h3>
                <div className="space-y-2">
                  <a
                    href="mailto:dan@fractional.quest"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    dan@fractional.quest
                  </a>
                  <a
                    href="https://linkedin.com/in/dankeegan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Calendly (3 cols) */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">📅</span>
                    <span className="font-semibold text-gray-900 text-sm">Select a Time</span>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full ml-auto">
                      Free • 30 min
                    </span>
                  </div>
                </div>

                {/* Direct iframe embed - loads immediately */}
                <iframe
                  src="https://calendly.com/firstquest/quest?hide_gdpr_banner=1&hide_landing_page_details=1&hide_event_type_details=1"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Schedule a call with Dan Keegan"
                  className="bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link
            href="/fractional-jobs-uk"
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Back to Jobs
          </Link>
        </div>
      </section>
    </main>
  )
}
