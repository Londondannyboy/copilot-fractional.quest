'use client'

import Link from 'next/link'

interface JobsSidebarProps {
  location?: string
  locationDisplay?: string
  showCalendly?: boolean
}

const POPULAR_ROLES = [
  { name: 'CFO Jobs', href: '/fractional-cfo-jobs-uk', icon: '💰' },
  { name: 'CTO Jobs', href: '/fractional-cto-jobs-uk', icon: '💻' },
  { name: 'CMO Jobs', href: '/fractional-cmo-jobs-uk', icon: '📣' },
  { name: 'COO Jobs', href: '/fractional-coo-jobs-uk', icon: '⚙️' },
  { name: 'CEO Jobs', href: '/fractional-ceo-jobs-uk', icon: '👔' },
  { name: 'CHRO Jobs', href: '/fractional-chro-jobs-uk', icon: '👥' },
]

const UK_LOCATIONS = [
  { name: 'London', href: '/fractional-jobs-london' },
  { name: 'Manchester', href: '/manchester' },
  { name: 'Birmingham', href: '/birmingham' },
  { name: 'Edinburgh', href: '/edinburgh' },
  { name: 'Remote UK', href: '/remote-fractional-jobs' },
]

export function JobsSidebar({ location, locationDisplay, showCalendly = true }: JobsSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Book a Call CTA */}
      {showCalendly && (
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Looking for Talent?</h3>
          <p className="text-emerald-100 text-sm mb-4">
            Book a free consultation to discuss your fractional hiring needs.
          </p>
          <Link
            href="/book-call"
            className="block w-full bg-white text-emerald-700 text-center font-semibold py-2.5 px-4 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Book a Call
          </Link>
        </div>
      )}

      {/* Popular Roles */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-bold text-gray-900 mb-4">Popular Roles</h3>
        <div className="space-y-2">
          {POPULAR_ROLES.map((role) => (
            <Link
              key={role.href}
              href={role.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="text-lg">{role.icon}</span>
              <span className="text-gray-700 group-hover:text-gray-900 font-medium text-sm">
                {role.name}
              </span>
              <svg className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* UK Locations */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-bold text-gray-900 mb-4">UK Locations</h3>
        <div className="flex flex-wrap gap-2">
          {UK_LOCATIONS.map((loc) => (
            <Link
              key={loc.href}
              href={loc.href}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                location && loc.href.includes(location)
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {loc.name}
            </Link>
          ))}
        </div>
      </div>

      {/* For Candidates */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
        <h3 className="font-bold text-gray-900 mb-2">For Candidates</h3>
        <p className="text-gray-600 text-sm mb-4">
          Ready to start your fractional career?
        </p>
        <div className="space-y-2">
          <Link
            href="/auth/sign-up"
            className="block w-full bg-indigo-600 text-white text-center font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            Create Profile
          </Link>
          <Link
            href="/fractional-jobs-uk"
            className="block w-full bg-white text-indigo-600 text-center font-semibold py-2 px-4 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors text-sm"
          >
            Browse All Jobs
          </Link>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
        <div className="space-y-3">
          <Link
            href="/fractional-cfo-salary"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span>📊</span>
            <span>Salary Guide 2025</span>
          </Link>
          <Link
            href="/articles/portfolio-career"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span>📚</span>
            <span>Portfolio Career Guide</span>
          </Link>
          <Link
            href="/fractional-cfo"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span>❓</span>
            <span>What is Fractional?</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default JobsSidebar
