import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Book a Call | Fractional Quest',
  description: 'Schedule a free consultation to discuss your fractional executive hiring needs or career goals.',
}

export default function BookCallPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Book a Call</h1>
          <p className="text-xl text-emerald-100">
            Schedule a free 30-minute consultation with our team
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Employers */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-emerald-600 text-white p-6">
                <h2 className="text-2xl font-bold">For Employers</h2>
                <p className="text-emerald-100 mt-2">Hire fractional executives</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <span className="text-gray-700">Discuss your fractional hiring needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <span className="text-gray-700">Get matched with vetted executives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <span className="text-gray-700">Understand pricing and engagement models</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <span className="text-gray-700">No commitment, free consultation</span>
                  </li>
                </ul>

                {/* Calendly Embed for Employers */}
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <a
                    href="https://calendly.com/fractionalquest/employer-consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Book Employer Consultation
                  </a>
                  <p className="text-sm text-gray-500 mt-3">
                    Opens Calendly in a new tab
                  </p>
                </div>
              </div>
            </div>

            {/* For Candidates */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-indigo-600 text-white p-6">
                <h2 className="text-2xl font-bold">For Candidates</h2>
                <p className="text-indigo-100 mt-2">Start your fractional career</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">✓</span>
                    <span className="text-gray-700">Explore fractional opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">✓</span>
                    <span className="text-gray-700">Get career guidance and advice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">✓</span>
                    <span className="text-gray-700">Understand market rates and positioning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-500 text-xl">✓</span>
                    <span className="text-gray-700">Personalized recommendations</span>
                  </li>
                </ul>

                {/* Calendly Embed for Candidates */}
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <a
                    href="https://calendly.com/fractionalquest/candidate-consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Book Career Consultation
                  </a>
                  <p className="text-sm text-gray-500 mt-3">
                    Opens Calendly in a new tab
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Contact */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Prefer to get in touch another way?
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="mailto:hello@fractional.quest"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
              <a
                href="https://linkedin.com/company/fractionalquest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
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
