'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Role-category based Unsplash images for job thumbnails
const ROLE_THUMB_IMAGES: Record<string, string[]> = {
  'Finance': [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=80&h=80&fit=crop',
  ],
  'Engineering': [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=80&h=80&fit=crop',
  ],
  'Marketing': [
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=80&h=80&fit=crop',
  ],
  'Operations': [
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=80&h=80&fit=crop',
  ],
  'HR': [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=80&h=80&fit=crop',
  ],
  'Product': [
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1558403194-611308249627?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&h=80&fit=crop',
  ],
  'Sales': [
    'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1552581234-26160f608093?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=80&h=80&fit=crop',
  ],
  'Security': [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=80&h=80&fit=crop',
  ],
  'default': [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=80&h=80&fit=crop',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=80&h=80&fit=crop',
  ],
}

function getJobImage(jobId: string, roleCategory?: string): string {
  const hash = jobId.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)
  const images = ROLE_THUMB_IMAGES[roleCategory || ''] || ROLE_THUMB_IMAGES.default
  return images[Math.abs(hash) % images.length]
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
                  src={getJobImage(job.id, job.role_category)}
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
