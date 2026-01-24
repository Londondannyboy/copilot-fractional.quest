'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Generate a unique colored initials thumbnail for each job
// This ensures no two adjacent jobs ever look the same
const THUMB_COLORS = [
  '0ea5e9', '8b5cf6', '06b6d4', 'f59e0b', 'ef4444',
  '10b981', '6366f1', 'ec4899', '14b8a6', 'f97316',
  '3b82f6', 'a855f7', '22c55e', 'e11d48', '0891b2',
  '7c3aed', 'd97706', '059669', 'dc2626', '2563eb',
]

function getJobImage(jobId: string, _roleCategory?: string, title?: string): string {
  // Use a hash of the job ID + title to pick a unique color
  const hashSource = `${jobId}-${title || ''}`
  let hash = 0
  for (let i = 0; i < hashSource.length; i++) {
    const char = hashSource.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  const colorIndex = Math.abs(hash) % THUMB_COLORS.length
  const bgColor = THUMB_COLORS[colorIndex]

  // Extract initials from job title (up to 2 chars)
  const words = (title || 'Job').split(/[\s\-\/]+/).filter(w => w.length > 0)
  let initials = ''
  if (words.length >= 2) {
    initials = (words[0][0] + words[1][0]).toUpperCase()
  } else if (words.length === 1) {
    initials = words[0].substring(0, 2).toUpperCase()
  }

  // Use ui-avatars.com to generate a unique colored thumbnail with initials
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=ffffff&size=80&font-size=0.4&bold=true&format=png`
}

interface HotJobLine {
  id: string
  slug: string
  title: string
  company_name: string
  location: string
  compensation?: string
  posted_date?: string
  is_remote?: boolean
  role_category?: string
}

interface HotJobsLinesProps {
  jobs: HotJobLine[]
  title?: string
  maxJobs?: number
  className?: string
  showViewAll?: boolean
  viewAllHref?: string
  viewAllText?: string
}

function getDaysAgo(dateString: string | undefined, now: Date): string {
  if (!dateString) return ''
  const posted = new Date(dateString)
  const diffMs = now.getTime() - posted.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1d'
  if (diffDays < 7) return `${diffDays}d`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w`
  return `${Math.floor(diffDays / 30)}mo`
}

function getStaticDate(dateString?: string): string {
  if (!dateString) return ''
  const posted = new Date(dateString)
  return posted.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export function HotJobsLines({
  jobs,
  title = 'Latest Jobs',
  maxJobs = 10,
  className = '',
  showViewAll = true,
  viewAllHref = '/fractional-jobs-uk',
  viewAllText = 'View all jobs'
}: HotJobsLinesProps) {
  const [isClient, setIsClient] = useState(false)
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setIsClient(true)
    setNow(new Date())
  }, [])

  const displayJobs = jobs.slice(0, maxJobs)

  if (displayJobs.length === 0) return null

  return (
    <div className={`bg-white border border-gray-200 rounded-xl ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-xl">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <h2 className="text-sm font-bold text-gray-900">{title}</h2>
          <span className="text-xs text-gray-500">({displayJobs.length})</span>
        </div>
        {showViewAll && (
          <Link href={viewAllHref} className="text-xs font-medium text-blue-600 hover:text-blue-700">
            {viewAllText} →
          </Link>
        )}
      </div>

      <div className="divide-y divide-gray-100">
        {displayJobs.filter(job => job.slug).map((job) => {
          const daysAgo = isClient && now ? getDaysAgo(job.posted_date, now) : getStaticDate(job.posted_date)

          return (
            <a
              key={`jobline-${job.slug}`}
              href={`/fractional-job/${job.slug}`}
              className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={getJobImage(job.id, job.role_category, job.title)}
                  alt={job.title}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="font-medium text-gray-900 group-hover:text-blue-600 truncate flex-1 min-w-0 text-sm">
                {job.title}
              </span>

              <span className="text-gray-500 text-sm truncate max-w-[120px] hidden sm:block">
                {job.company_name}
              </span>

              <span className="text-gray-500 text-xs truncate max-w-[80px] hidden md:block">
                {job.is_remote ? 'Remote' : job.location?.split(',')[0]}
              </span>

              {job.compensation && (
                <span className="text-emerald-700 text-xs font-medium hidden lg:block">
                  {job.compensation}
                </span>
              )}

              {daysAgo && (
                <span className="text-gray-500 text-xs w-10 text-right flex-shrink-0">
                  {daysAgo}
                </span>
              )}

              <svg
                className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )
        })}
      </div>

      {showViewAll && jobs.length > maxJobs && (
        <div className="px-4 py-2 bg-gray-50 rounded-b-xl border-t border-gray-100">
          <Link href={viewAllHref} className="text-xs text-gray-500 hover:text-blue-600">
            +{jobs.length - maxJobs} more jobs available
          </Link>
        </div>
      )}
    </div>
  )
}
