import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Book a Call with Dan | Fractional Quest',
  description: 'Schedule a free consultation to discuss your fractional executive hiring needs or career goals with Dan Keegan, founder of Fractional Quest.',
}

export default function BookCallPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Calendly Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      {/* Hero with Dan's photo */}
      <section className="bg-gradient-to-br from-orange-500 via-rose-500 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/dan-keegan.webp"
              alt="Dan Keegan - Founder of Fractional Quest"
              width={120}
              height={120}
              className="rounded-full border-4 border-white/30 shadow-2xl object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">Book a Call with Dan</h1>
          <p className="text-xl text-white/90 mb-2">
            Fractional Executive & Founder
          </p>
          <p className="text-white/80 max-w-2xl mx-auto">
            With 15+ years in executive roles, I&apos;ve helped dozens of companies find the right fractional talent
            and guided hundreds of professionals into successful portfolio careers.
          </p>
        </div>
      </section>

      {/* Calendly Embed - Full Width */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            {/* Calendly inline widget */}
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/fractionalquest/30min?hide_gdpr_banner=1&background_color=ffffff&text_color=1f2937&primary_color=f97316"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-bold text-gray-900 mb-2">For Employers</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Discuss your fractional hiring needs</li>
                <li>• Get matched with vetted executives</li>
                <li>• Understand pricing models</li>
                <li>• No commitment required</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">💼</div>
              <h3 className="font-bold text-gray-900 mb-2">For Candidates</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Explore fractional opportunities</li>
                <li>• Career guidance and advice</li>
                <li>• Market rate positioning</li>
                <li>• Personalized recommendations</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">⏱️</div>
              <h3 className="font-bold text-gray-900 mb-2">30 Minutes</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Quick, focused conversation</li>
                <li>• Video call via Zoom</li>
                <li>• Actionable next steps</li>
                <li>• Follow-up resources</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">
            Prefer to get in touch another way?
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:dan@fractional.quest"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              dan@fractional.quest
            </a>
            <a
              href="https://linkedin.com/in/dankeegan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Back Link */}
          <div className="mt-8">
            <Link
              href="/fractional-jobs-uk"
              className="text-gray-500 hover:text-gray-700"
            >
              ← Back to Jobs
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
