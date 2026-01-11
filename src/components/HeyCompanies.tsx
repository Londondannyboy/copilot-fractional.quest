'use client'

import Link from 'next/link'
import Image from 'next/image'

interface HeyCompaniesProps {
  location?: string
}

export function HeyCompanies({ location = 'London' }: HeyCompaniesProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='5' cy='5' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-xl">🏢</span>
              <span className="font-semibold">For Employers</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">
              Hey, Companies!
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Need fractional executive talent in {location}? We make hiring simple.
            </p>

            {/* Value Props */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                <div>
                  <span className="font-semibold">Free Job Listings</span>
                  <p className="text-white/80 text-sm">Post unlimited fractional roles at no cost</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                <div>
                  <span className="font-semibold">Referral Fees from 10%</span>
                  <p className="text-white/80 text-sm">Only pay when you successfully hire</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                <div>
                  <span className="font-semibold">Vetted Executive Network</span>
                  <p className="text-white/80 text-sm">Access pre-qualified CFOs, CTOs, CMOs & more</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/book-call"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors shadow-lg hover:shadow-xl"
            >
              <span>Book a Free Discovery Call</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-white/70 text-sm mt-3">
              30-minute consultation • No commitment
            </p>
          </div>

          {/* Right: Founder Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white/30">
                <Image
                  src="https://ui-avatars.com/api/?name=Dan+Keegan&background=6366f1&color=fff&size=200"
                  alt="Dan Keegan - Founder"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Dan Keegan</h3>
                <p className="text-white/80">Founder, Fractional Quest</p>
                <a
                  href="https://linkedin.com/in/dankeegan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mt-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            <blockquote className="text-white/90 italic mb-6">
              "I help companies find the right fractional executives for their growth stage. Let's talk about your needs - no sales pitch, just honest advice."
            </blockquote>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-white/70">Executives</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm text-white/70">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">48h</div>
                <div className="text-sm text-white/70">Response</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
