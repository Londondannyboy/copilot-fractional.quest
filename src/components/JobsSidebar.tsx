'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AuthorityLinks, StatisticsHighlight, RelatedPages } from './sidebar'

interface AuthorityLink {
  name: string
  url: string
  context: string
}

interface Statistic {
  value: string
  description: string
  source: string
}

interface RelatedPage {
  name: string
  url: string
}

interface SidebarJob {
  id: string
  slug: string
  title: string
  company_name: string
  location: string
  compensation?: string
}

interface JobsSidebarProps {
  location?: string
  locationDisplay?: string
  roleCategory?: string // e.g., 'Finance', 'Engineering', 'Marketing'
  showCalendly?: boolean
  // Enriched SEO content
  authorityLinks?: AuthorityLink[]
  statistics?: Record<string, Statistic>
  relatedPages?: RelatedPage[]
  accentColor?: 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'indigo'
  currentPath?: string
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

// Role images for sidebar job cards
const ROLE_IMAGES: Record<string, string> = {
  'Finance': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=80&h=80&fit=crop',
  'Engineering': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop',
  'Marketing': 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=80&h=80&fit=crop',
  'Operations': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
  'HR': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=80&h=80&fit=crop',
  'default': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&h=80&fit=crop',
}

export function JobsSidebar({
  location,
  locationDisplay,
  roleCategory,
  showCalendly = true,
  authorityLinks,
  statistics,
  relatedPages,
  accentColor = 'emerald',
  currentPath,
}: JobsSidebarProps) {
  const [featuredJobs, setFeaturedJobs] = useState<SidebarJob[]>([])
  const [loadingJobs, setLoadingJobs] = useState(true)

  // Fetch jobs relevant to the page - fallback to any jobs if not enough
  useEffect(() => {
    async function fetchJobs() {
      setLoadingJobs(true)
      try {
        const params = new URLSearchParams()
        if (location) params.set('location', location === 'london' ? 'London' : location)
        if (roleCategory) params.set('role', roleCategory)
        params.set('limit', '5')

        let response = await fetch(`/api/jobs/search?${params.toString()}`)
        let data = await response.json()
        let jobs = data.jobs || []

        // If not enough jobs with filters, fetch any jobs as fallback
        if (jobs.length < 3) {
          const fallbackResponse = await fetch('/api/jobs/search?limit=5')
          const fallbackData = await fallbackResponse.json()
          const existingIds = new Set(jobs.map((j: SidebarJob) => j.id))
          const extraJobs = (fallbackData.jobs || []).filter((j: SidebarJob) => !existingIds.has(j.id))
          jobs = [...jobs, ...extraJobs].slice(0, 5)
        }

        setFeaturedJobs(jobs)
      } catch (error) {
        console.error('Error fetching sidebar jobs:', error)
      } finally {
        setLoadingJobs(false)
      }
    }

    fetchJobs()
  }, [location, roleCategory])

  return (
    <aside className="space-y-6">
      {/* Featured Jobs - Always show jobs! */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3">
          <h3 className="font-bold text-white flex items-center gap-2">
            <span className="animate-pulse">🔥</span>
            {locationDisplay ? `Hot ${locationDisplay} Jobs` : 'Hot Jobs'}
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {loadingJobs ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))
          ) : featuredJobs.length > 0 ? (
            featuredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/fractional-job/${job.slug}`}
                className="flex gap-3 p-4 hover:bg-amber-50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <Image
                    src={ROLE_IMAGES[roleCategory || ''] || ROLE_IMAGES.default}
                    alt={job.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate group-hover:text-amber-700 transition-colors">
                    {job.title}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">{job.company_name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{job.location}</span>
                    {job.compensation && (
                      <span className="text-xs font-medium text-emerald-600">{job.compensation}</span>
                    )}
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              No jobs found. Check back soon!
            </div>
          )}
        </div>
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
          <Link
            href={location ? `/fractional-jobs-${location}` : '/fractional-jobs-uk'}
            className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center justify-center gap-1"
          >
            View all jobs
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Book a Call CTA - Eye-catching with photo */}
      {showCalendly && (
        <div className="bg-gradient-to-br from-orange-500 via-rose-500 to-purple-600 rounded-xl overflow-hidden shadow-lg">
          {/* Photo + Content */}
          <div className="p-5 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="https://ui-avatars.com/api/?name=Dan+Keegan&size=64&background=ffffff&color=7c3aed&bold=true"
                alt="Dan Keegan"
                width={56}
                height={56}
                className="rounded-full border-2 border-white/30 shadow-lg"
              />
              <div>
                <h3 className="font-bold text-lg">Talk to Dan</h3>
                <p className="text-white/80 text-sm">Founder, Fractional Quest</p>
              </div>
            </div>
            <p className="text-white/90 text-sm mb-4">
              Get expert guidance on hiring fractional executives or starting your portfolio career.
            </p>
            <Link
              href="/book-call"
              className="block w-full bg-white text-purple-700 text-center font-bold py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors shadow-md"
            >
              📅 Book a Free Call
            </Link>
          </div>
        </div>
      )}

      {/* Market Statistics - NEW */}
      {statistics && Object.keys(statistics).length > 0 && (
        <StatisticsHighlight
          statistics={statistics}
          title="Market Insights"
          accentColor={accentColor}
        />
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

      {/* Related Pages - NEW */}
      {relatedPages && relatedPages.length > 0 && (
        <RelatedPages
          pages={relatedPages}
          title="Related Pages"
          currentPath={currentPath}
        />
      )}

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

      {/* Authority Links - NEW */}
      {authorityLinks && authorityLinks.length > 0 && (
        <AuthorityLinks
          links={authorityLinks}
          title="Trusted Sources"
        />
      )}

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
