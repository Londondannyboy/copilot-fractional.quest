import { Metadata } from 'next'
import Link from 'next/link'
import { CaseStudy } from '@/components/CaseStudy'
import { TrustSignals, TrustSignalsSchema } from '@/components/TrustSignals'
import { Testimonials, TestimonialsSchema } from '@/components/Testimonials'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'

export const metadata: Metadata = {
  title: 'Fractional Executive Case Study | OneUp Productions Success Story',
  description: 'Discover how fractional GTM leadership helped OneUp Productions expand into 3 new international markets. Real metrics, real results.',
  keywords: ['fractional executive case study', 'fractional gtm case study', 'oneup productions', 'gaming market expansion'],
  openGraph: {
    title: 'Fractional Executive Case Study | OneUp Productions Success Story',
    description: 'Discover how fractional GTM leadership helped OneUp Productions expand into 3 new international markets.',
    url: 'https://fractional.quest/case-studies',
    type: 'website',
  },
}

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full mb-4">
            Real Results
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
            Fractional Executive Case Study
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            See how fractional leadership delivers real results for growing businesses.
          </p>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">
              Featured: OneUp Productions
            </h2>
            <p className="text-gray-600">
              How fractional GTM leadership helped a gaming company expand into 3 new international markets
            </p>
          </div>

          {/* Case Study Detail */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center text-3xl font-bold">
                1U
              </div>
              <div>
                <h3 className="text-2xl font-bold">OneUp Productions</h3>
                <p className="text-white/80">Gaming & Esports Production Company</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">3</div>
                <div className="text-sm text-white/80">New Markets Entered</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">2-3</div>
                <div className="text-sm text-white/80">Days Per Week</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">GTM</div>
                <div className="text-sm text-white/80">Strategy Delivered</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">The Challenge</h4>
                <p className="text-white/90">
                  OneUp Productions needed to expand into new international markets but lacked the in-house
                  expertise for go-to-market strategy. They needed senior GTM leadership without the
                  commitment of a full-time hire.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">The Solution</h4>
                <p className="text-white/90">
                  Engaged as Fractional GTM Lead to develop and execute market expansion strategy,
                  working 2-3 days per week alongside the existing leadership team.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/case-studies/oneup-productions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Read Full Case Study
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Fractional */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-playfair">
            Why Companies Choose Fractional
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="font-bold text-gray-900 mb-2">Cost Effective</h3>
              <p className="text-gray-600 text-sm">
                Get senior executive expertise at 30-40% of the cost of a full-time hire.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Immediate Impact</h3>
              <p className="text-gray-600 text-sm">
                Experienced leaders hit the ground running with proven playbooks.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="font-bold text-gray-900 mb-2">Flexible Scale</h3>
              <p className="text-gray-600 text-sm">
                Scale involvement up or down based on business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <Testimonials variant="featured" />
      <TestimonialsSchema />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-playfair">
            Ready for Your Own Success Story?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Discover how fractional leadership can help your business grow.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/fractional-jobs-uk"
              className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Browse Fractional Roles
            </Link>
            <Link
              href="/book-call"
              className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors border border-emerald-500"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>

      {/* Expert Profile */}
      <ExpertProfile />
      <ExpertProfileSchema />
      <TrustSignalsSchema />
    </main>
  )
}
