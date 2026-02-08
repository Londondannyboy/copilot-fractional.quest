'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Audience = 'candidates' | 'employers'

export function PublicLanding() {
  const [audience, setAudience] = useState<Audience>('candidates')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-16">
          {/* Logo - Changed from h1 to div to fix duplicate h1 issue */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-white">Fractional Quest</div>
            <p className="text-emerald-400 text-sm mt-1">Beta Launching Q1 2026</p>
          </div>

          {/* Audience Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800 rounded-full p-1 flex gap-1">
              <button
                onClick={() => setAudience('candidates')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  audience === 'candidates'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                I'm Looking for Roles
              </button>
              <button
                onClick={() => setAudience('employers')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  audience === 'employers'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                I'm Hiring
              </button>
            </div>
          </div>

          {/* Single h1 tag - Primary target keyword */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Fractional Recruitment Agency UK
            </h1>
            <p className="text-2xl text-gray-200 mb-4 font-semibold">
              {audience === 'candidates'
                ? 'Find Fractional Executive Jobs Through Our Specialist Agency'
                : 'Hire C-Suite Executives at 10-15% Fees vs Industry Standard 25-30%'
              }
            </p>
            <div className="space-y-4 mb-8">
              {audience === 'candidates' ? (
                <>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Browse 200+ fractional CFO, CTO, CMO roles. Our fractional recruitment agency specialises in matching senior executives with part-time C-suite opportunities across the UK.
                  </p>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    From London to Manchester, Edinburgh to Bristol, we connect fractional leaders with companies needing experienced executive talent without full-time commitments.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    As a leading fractional recruitment agency, we specialise in placing fractional CFOs, CTOs, CMOs, and COOs with UK businesses.
                  </p>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    Our recruitment agency model offers transparent 10-15% placement fees—significantly lower than traditional executive search firms charging 25-30%. We understand fractional hiring and deliver pre-vetted C-suite talent in days, not weeks.
                  </p>
                </>
              )}
            </div>

            {/* Hero Image with keyword in alt */}
            <div className="relative h-64 md:h-80 mb-8 rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop&q=80"
                alt="Fractional recruitment agency UK connecting executives with C-suite opportunities"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {audience === 'candidates' ? (
                <>
                  <Link
                    href="/register"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold transition-colors text-xl shadow-lg"
                  >
                    Register Interest
                  </Link>
                  <Link
                    href="/fractional-jobs-uk"
                    className="bg-gray-800 hover:bg-gray-900 text-white px-10 py-5 rounded-xl font-bold transition-colors text-xl border border-gray-600"
                  >
                    Browse Jobs
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/book-call"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-xl font-bold transition-colors text-xl shadow-lg"
                  >
                    Book a Call
                  </Link>
                  <Link
                    href="/"
                    className="bg-gray-800 hover:bg-gray-900 text-white px-10 py-5 rounded-xl font-bold transition-colors text-xl border border-gray-600"
                  >
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-700 bg-gray-800/50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-emerald-400">200+</p>
              <p className="text-gray-400 text-sm mt-1">Live Opportunities</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">8</p>
              <p className="text-gray-400 text-sm mt-1">C-Suite Roles</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">£600-2,000</p>
              <p className="text-gray-400 text-sm mt-1">Day Rate Range</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-400">10-15%</p>
              <p className="text-gray-400 text-sm mt-1">Hiring Fee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured: Fractional Recruitment Agency Guide */}
      <section className="py-10 bg-gradient-to-r from-orange-600/20 via-rose-600/20 to-purple-600/20 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-800/50 rounded-2xl p-6 md:p-8 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎯</div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Featured Guide</span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">Fractional Recruitment Agency Guide</h3>
                <p className="text-gray-400 mt-2 text-sm md:text-base">Compare top UK agencies, understand fees (15-25%), and learn how to hire fractional executives. Includes FAQs, comparison tables, and booking widget.</p>
              </div>
            </div>
            <Link
              href="/"
              className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg whitespace-nowrap"
            >
              Read the Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* What is a Fractional Recruitment Agency - SEO Content Block */}
      <section className="py-12 md:py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">What is a Fractional Recruitment Agency?</h2>

          <div className="space-y-6">
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              A <strong>fractional recruitment agency</strong> specialises exclusively in placing part-time and fractional C-suite executives with companies.
            </p>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              Unlike traditional recruitment agencies that focus on permanent full-time hires, we understand the unique dynamics of fractional work arrangements where executives work 1-3 days per week across multiple companies.
            </p>

            <div className="border-l-4 border-emerald-500 pl-4 py-2 bg-gray-800/50">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Our fractional recruitment agency model benefits both candidates and employers.
              </p>
            </div>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              For executives, we provide access to curated fractional CFO jobs, fractional CTO roles, and fractional CMO opportunities across finance, technology, marketing, operations, and security functions.
            </p>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              For employers, we deliver experienced C-suite talent at a fraction of the cost of permanent hires, with placement fees of just 10-15% versus the 25-30% charged by traditional executive search firms.
            </p>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              As the UK's leading fractional recruitment agency, we've built a network of over 200 active fractional executive opportunities across London, Manchester, Edinburgh, Bristol, and remote roles nationwide.
            </p>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              Our recruiters understand that fractional hiring requires different vetting than permanent placements—we assess not just technical competence but also the ability to onboard quickly, work autonomously, and deliver measurable results in compressed timeframes.
            </p>
          </div>
        </div>
      </section>

      {/* For Candidates Section */}
      {audience === 'candidates' && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Why Executives Choose Our Fractional Recruitment Agency
            </h2>
            <div className="text-center mb-12 max-w-2xl mx-auto space-y-3">
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                We're not another job board with recruiter spam.
              </p>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                We're a specialist fractional recruitment agency connecting experienced C-suite executives with genuine part-time leadership roles at competitive day rates.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">Curated Opportunities</h3>
                <div className="space-y-2">
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    Every role is carefully verified and thoroughly vetted by our specialist team.
                  </p>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    No time-wasters, no junior positions disguised as fractional. Only genuine C-suite fractional opportunities from reputable companies who truly understand fractional hiring.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">🔍</div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">Transparent Day Rates</h3>
                <div className="space-y-2">
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    See actual day rates (£600-£2,000) upfront. No guessing, no negotiations that waste your time.
                  </p>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    We publish market-rate benchmarks for every role from fractional CFO to fractional CISO.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">Expert Recruiters</h3>
                <div className="space-y-2">
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    Our recruitment agency team understands fractional work.
                  </p>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    We match you based on your schedule, sector expertise, and career goals—not just keywords on a CV.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* For Employers Section */}
      {audience === 'employers' && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Why Companies Choose Our Fractional Recruitment Agency
            </h2>
            <div className="text-center mb-12 max-w-2xl mx-auto space-y-3">
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                As a leading fractional recruitment agency, we offer lower placement fees, faster hiring timelines, and better-qualified fractional executives than traditional executive search firms.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">10-15% Placement Fees</h3>
                <div className="space-y-2">
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    We charge 10-15% of estimated annual billings vs 25-30% at traditional agencies.
                  </p>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    Same quality C-suite talent, better economics for your business.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">Faster Placements</h3>
                <div className="space-y-2">
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    Most placements complete in 2-3 weeks vs 8-12 weeks for traditional executive search.
                  </p>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    Our database of active fractional candidates means no lengthy sourcing delays.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">✅</div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">Pre-Vetted Executives</h3>
                <div className="space-y-2">
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    Every candidate has verified C-suite or VP-level experience.
                  </p>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    We assess technical competence, fractional readiness, and culture fit before introductions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Role Categories */}
      <section className="py-16 bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Fractional Recruitment Agency Specialist Roles
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            From fractional CFOs to fractional CTOs, CMOs to CISOs. Our recruitment agency covers all C-suite functions with specialist recruiters for each vertical.
          </p>

          {/* Job Boards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <Link
              href="/fractional-cfo-jobs-uk"
              className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/30 rounded-xl p-6 text-center hover:border-emerald-400/50 transition-all group"
            >
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Jobs</span>
              <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-emerald-300 transition-colors">Fractional CFO</h3>
              <p className="text-gray-400 text-sm mt-2">£1,200-1,800/day</p>
              <p className="text-gray-500 text-xs mt-1">Finance leadership roles</p>
            </Link>
            <Link
              href="/fractional-cto-jobs-uk"
              className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-all group"
            >
              <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">Jobs</span>
              <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">Fractional CTO</h3>
              <p className="text-gray-400 text-sm mt-2">£1,000-1,600/day</p>
              <p className="text-gray-500 text-xs mt-1">Technology leadership roles</p>
            </Link>
            <Link
              href="/fractional-cmo-jobs-uk"
              className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 border border-amber-500/30 rounded-xl p-6 text-center hover:border-amber-400/50 transition-all group"
            >
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Jobs</span>
              <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-amber-300 transition-colors">Fractional CMO</h3>
              <p className="text-gray-400 text-sm mt-2">£900-1,400/day</p>
              <p className="text-gray-500 text-xs mt-1">Marketing leadership roles</p>
            </Link>
            <Link
              href="/fractional-ciso-jobs-uk"
              className="bg-gradient-to-r from-red-900/50 to-rose-900/50 border border-red-500/30 rounded-xl p-6 text-center hover:border-red-400/50 transition-all group"
            >
              <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">Jobs</span>
              <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-red-300 transition-colors">Fractional CISO</h3>
              <p className="text-gray-400 text-sm mt-2">£1,100-1,700/day</p>
              <p className="text-gray-500 text-xs mt-1">Security leadership roles</p>
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/fractional-jobs-uk"
              className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-lg"
            >
              View All 200+ Roles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-900/50 to-indigo-900/50 border-y border-gray-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {audience === 'candidates' ? 'Ready to Find Your Next Fractional Role?' : 'Ready to Hire a Fractional Executive?'}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {audience === 'candidates'
              ? 'Join our beta waitlist and be first to access exclusive fractional executive opportunities when we launch in Q1 2026.'
              : 'Book a free consultation call to discuss your hiring needs. No obligation, no sales pitch—just expert advice from our fractional recruitment specialists.'
            }
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {audience === 'candidates' ? (
              <Link
                href="/register"
                className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-5 rounded-xl font-bold transition-colors text-xl shadow-lg"
              >
                Register for Beta Access
              </Link>
            ) : (
              <Link
                href="/book-call"
                className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-5 rounded-xl font-bold transition-colors text-xl shadow-lg"
              >
                Book Free Consultation
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
