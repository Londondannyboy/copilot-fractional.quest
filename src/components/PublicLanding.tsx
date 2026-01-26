'use client'

import { useState } from 'react'
import Link from 'next/link'

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
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Fractional Quest</h1>
            <p className="text-emerald-400 text-sm mt-1">AI-Powered Executive Matching</p>
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

          {/* Main Pitch */}
          {audience === 'candidates' ? (
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Find Your Next
                <span className="text-emerald-400"> Fractional </span>
                Executive Role
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Skip the recruiters who ghost you. Our AI searches hundreds of opportunities daily
                and matches you with roles that actually fit your experience and goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/auth/sign-in"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-medium transition-colors text-lg"
                >
                  Start Your Search
                </Link>
                <Link
                  href="/fractional-jobs-uk"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-medium transition-colors text-lg"
                >
                  Browse Jobs
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Hire
                <span className="text-indigo-400"> Fractional </span>
                Executives
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Get C-suite expertise without the full-time commitment or agency fees.
                We charge 10-15% vs the industry standard 25-30%.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/book-call"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-medium transition-colors text-lg"
                >
                  Book a Call
                </Link>
                <Link
                  href="/hire-fractional-cfo"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-medium transition-colors text-lg"
                >
                  Learn More
                </Link>
              </div>
            </div>
          )}
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

      {/* For Candidates Section */}
      {audience === 'candidates' && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-white text-center mb-12">
              Why Executives Choose Us
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">🎯</div>
                <h4 className="text-lg font-semibold text-white mb-2">AI-Powered Matching</h4>
                <p className="text-gray-400">
                  Our AI understands your experience, preferences, and goals. No more scrolling through irrelevant listings.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">🔍</div>
                <h4 className="text-lg font-semibold text-white mb-2">Direct Opportunities</h4>
                <p className="text-gray-400">
                  We filter out recruiter spam. Every role is from a real company looking for fractional leadership.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">💬</div>
                <h4 className="text-lg font-semibold text-white mb-2">Voice-First Search</h4>
                <p className="text-gray-400">
                  Just tell our AI what you're looking for. "Find me CFO roles in London, 3 days a week."
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* For Employers Section */}
      {audience === 'employers' && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-white text-center mb-12">
              Why Companies Work With Us
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">💰</div>
                <h4 className="text-lg font-semibold text-white mb-2">Lower Fees</h4>
                <p className="text-gray-400">
                  10-15% of first year salary vs 25-30% at traditional agencies. Same quality, better economics.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">⚡</div>
                <h4 className="text-lg font-semibold text-white mb-2">Faster Matching</h4>
                <p className="text-gray-400">
                  AI-powered search means we find qualified candidates in days, not weeks. No lengthy recruitment cycles.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">✅</div>
                <h4 className="text-lg font-semibold text-white mb-2">Pre-Vetted Talent</h4>
                <p className="text-gray-400">
                  Every executive on our platform has verified C-suite or VP experience. No junior candidates.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Role Categories */}
      <section className="py-16 bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            Executive Roles We Cover
          </h3>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From finance to technology, marketing to operations. Find or hire fractional leadership across all business functions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { role: 'CFO', label: 'Chief Financial Officer', href: '/fractional-cfo-jobs-uk', color: 'emerald' },
              { role: 'CTO', label: 'Chief Technology Officer', href: '/fractional-cto-jobs-uk', color: 'blue' },
              { role: 'CMO', label: 'Chief Marketing Officer', href: '/fractional-cmo-jobs-uk', color: 'amber' },
              { role: 'COO', label: 'Chief Operating Officer', href: '/fractional-coo-jobs-uk', color: 'purple' },
              { role: 'CHRO', label: 'Chief HR Officer', href: '/fractional-chro-jobs-uk', color: 'pink' },
              { role: 'CEO', label: 'Chief Executive Officer', href: '/fractional-ceo-jobs-uk', color: 'yellow' },
              { role: 'CPO', label: 'Chief Product Officer', href: '/fractional-cpo-jobs-uk', color: 'indigo' },
              { role: 'CISO', label: 'Security Officer', href: '/fractional-ciso-jobs-uk', color: 'red' },
            ].map((item) => (
              <Link
                key={item.role}
                href={item.href}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-4 text-center transition-colors group"
              >
                <p className={`text-xl font-bold text-${item.color}-400 group-hover:text-${item.color}-300`}>
                  {item.role}
                </p>
                <p className="text-gray-400 text-sm mt-1">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Honest About Being New */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            We're Building Something Different
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            We're a new platform, so we don't have walls of testimonials yet.
            What we do have is a genuine commitment to making fractional executive
            hiring better for everyone - lower fees for companies, better matching for candidates.
          </p>
          <p className="text-gray-400 mb-8">
            Try us. If we don't deliver, you've lost nothing. If we do, you'll be one of our early success stories.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/sign-in"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/book-call"
              className="border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-xl font-medium transition-colors"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>

      {/* Related Executive Services */}
      <section className="py-12 bg-gray-800/20 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-semibold text-white text-center mb-6">Related Executive Services</h3>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto text-sm">
            Looking for different types of executive support? Our partner sites specialise in complementary areas.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="https://interim.quest" target="_blank" rel="noopener noreferrer" className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl p-4 text-center transition-colors">
              <p className="text-emerald-400 font-semibold">Interim Executives</p>
              <p className="text-gray-400 text-sm mt-1">Full-time temporary C-suite for 3-12 month assignments</p>
            </a>
            <a href="https://chiefofstaff.quest" target="_blank" rel="noopener noreferrer" className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl p-4 text-center transition-colors">
              <p className="text-indigo-400 font-semibold">Chief of Staff</p>
              <p className="text-gray-400 text-sm mt-1">Specialist recruitment for strategic operations roles</p>
            </a>
            <a href="https://gtm.quest" target="_blank" rel="noopener noreferrer" className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl p-4 text-center transition-colors">
              <p className="text-amber-400 font-semibold">GTM Strategy</p>
              <p className="text-gray-400 text-sm mt-1">Go-to-market strategy and execution for B2B growth</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">For Candidates</h4>
              <ul className="space-y-2">
                <li><Link href="/fractional-jobs-uk" className="text-gray-400 hover:text-white text-sm">Browse Jobs</Link></li>
                <li><Link href="/auth/sign-in" className="text-gray-400 hover:text-white text-sm">Create Profile</Link></li>
                <li><Link href="/news" className="text-gray-400 hover:text-white text-sm">Industry News</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2">
                <li><Link href="/hire-fractional-cfo" className="text-gray-400 hover:text-white text-sm">Hire a CFO</Link></li>
                <li><Link href="/hire-fractional-cto" className="text-gray-400 hover:text-white text-sm">Hire a CTO</Link></li>
                <li><Link href="/book-call" className="text-gray-400 hover:text-white text-sm">Book a Call</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/fractional-executive-meaning" className="text-gray-400 hover:text-white text-sm">What is Fractional?</Link></li>
                <li><Link href="/fractional-cfo-salary" className="text-gray-400 hover:text-white text-sm">Salary Guide</Link></li>
                <li><Link href="/news" className="text-gray-400 hover:text-white text-sm">Latest News</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Fractional Quest. AI-powered executive matching.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLanding
