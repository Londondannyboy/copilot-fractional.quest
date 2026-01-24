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

// Multiple images per role category for visual variety in sidebar
const ROLE_THUMB_IMAGES: Record<string, string[]> = {
  'Finance': [
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=80&h=80&fit=crop',
  ],
  'Engineering': [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=80&h=80&fit=crop',
  ],
  'Marketing': [
    'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1557838923-2985c318be48?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=80&fit=crop',
  ],
  'Operations': [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=80&h=80&fit=crop',
  ],
  'HR': [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=80&h=80&fit=crop',
  ],
  'default': [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=80&h=80&fit=crop',
  ],
}

// Header images for sidebar hot jobs section
const SIDEBAR_HEADER_IMAGES: Record<string, string> = {
  'Finance': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=120&fit=crop',
  'Engineering': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=120&fit=crop',
  'Marketing': 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=400&h=120&fit=crop',
  'Operations': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=120&fit=crop',
  'HR': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=120&fit=crop',
  'default': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=120&fit=crop',
}

function getJobThumb(jobId: string, roleCategory?: string): string {
  const hash = jobId.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)
  const images = ROLE_THUMB_IMAGES[roleCategory || ''] || ROLE_THUMB_IMAGES.default
  return images[Math.abs(hash) % images.length]
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
        <div className="relative h-14 overflow-hidden">
          <Image
            src={SIDEBAR_HEADER_IMAGES[roleCategory || ''] || SIDEBAR_HEADER_IMAGES.default}
            alt=""
            fill
            className="object-cover"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60" />
          <div className="absolute inset-0 flex items-center px-5">
            <p className="font-bold text-white flex items-center gap-2 text-sm">
              <span>🔥</span>
              {locationDisplay ? `Hot ${locationDisplay} Jobs` : 'Hot Jobs'}
            </p>
          </div>
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
            featuredJobs.filter(job => job.slug).map((job) => (
              <Link
                key={job.id}
                href={`/fractional-job/${job.slug}`}
                className="flex gap-3 p-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <Image
                    src={getJobThumb(job.id, roleCategory)}
                    alt={job.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate group-hover:text-blue-700 transition-colors">
                    {job.title}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">{job.company_name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{job.location}</span>
                    {job.compensation && (
                      <span className="text-xs font-medium text-emerald-700">{job.compensation}</span>
                    )}
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            className="text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center justify-center gap-1"
          >
            View all jobs
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Book a Call CTA */}
      {showCalendly && (
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop"
            alt=""
            fill
            className="object-cover"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/85 to-gray-900/95" />
          <div className="relative p-5 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/dan-keegan.webp"
                alt="Dan Keegan - Founder of Fractional Quest"
                width={56}
                height={56}
                className="rounded-full border-2 border-white/30 shadow-lg object-cover"
              />
              <div>
                <p className="font-bold text-base">Talk to Dan</p>
                <p className="text-white/70 text-sm">Fractional Executive & Founder</p>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4">
              15+ years in executive roles. Let me help you navigate your fractional journey.
            </p>
            <Link
              href="/book-call"
              className="block w-full bg-white text-gray-900 text-center font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors shadow-md text-sm"
            >
              Book a Free Call
            </Link>
          </div>
        </div>
      )}

      {/* Trusted By - Client Logos */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">
          Trusted by executives from
        </p>
        <div className="grid grid-cols-5 gap-2">
          <div className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors" title="Sony">
            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">SONY</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors" title="Orange">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors" title="Hutchison 3G">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">H3G</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors" title="OneUp Productions">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">1U</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors" title="CK Delta">
            <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">CKD</span>
            </div>
          </div>
        </div>
      </div>

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
        <p className="font-bold text-gray-900 mb-4">Popular Roles</p>
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
        <p className="font-bold text-gray-900 mb-4">UK Locations</p>
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
        <p className="font-bold text-gray-900 mb-2">For Candidates</p>
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
        <p className="font-bold text-gray-900 mb-4">Resources</p>
        <div className="space-y-3">
          <Link
            href="/fractional-cfo-salary"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span>📊</span>
            <span>Salary Guide 2026</span>
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

      {/* Why Go Fractional - Benefits List */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
        <p className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>💡</span>
          Why Go Fractional?
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700">Work with multiple clients</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700">Set your own day rate</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700">Flexible schedule & location</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700">High-impact strategic work</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700">Avoid office politics</span>
          </li>
        </ul>
      </div>

      {/* Success Story / Testimonial */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-yellow-400 text-lg">★★★★★</span>
        </div>
        <blockquote className="text-gray-700 text-sm italic mb-4">
          &ldquo;Moving to fractional work was the best decision I ever made. I now work with 3 clients, earn more than my previous salary, and have Fridays off.&rdquo;
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            SM
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm">Sarah M.</p>
            <p className="text-xs text-gray-500">Fractional CMO, London</p>
          </div>
        </div>
      </div>

      {/* Quick Market Stats */}
      <div className="bg-gray-900 text-white rounded-xl p-5">
        <p className="font-bold mb-4 flex items-center gap-2">
          <span>📈</span>
          UK Market Snapshot
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-emerald-400">£850</p>
            <p className="text-xs text-gray-300">Avg Day Rate</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-400">340%</p>
            <p className="text-xs text-gray-300">Market Growth</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-400">78%</p>
            <p className="text-xs text-gray-300">Remote Options</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-400">2.3</p>
            <p className="text-xs text-gray-300">Avg Clients</p>
          </div>
        </div>
      </div>

      {/* Newsletter Signup - Compact */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-5 text-white">
        <p className="font-bold mb-2">📬 Weekly Insights</p>
        <p className="text-sm text-white/80 mb-3">
          Get the latest fractional jobs and market insights.
        </p>
        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="sidebar-email" className="sr-only">Email address</label>
          <input
            id="sidebar-email"
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Email address for newsletter"
          />
          <button
            type="submit"
            className="w-full bg-white text-purple-700 font-semibold py-2 rounded-lg hover:bg-purple-50 transition-colors text-sm"
          >
            Subscribe Free
          </button>
        </form>
      </div>
    </aside>
  )
}

export default JobsSidebar
