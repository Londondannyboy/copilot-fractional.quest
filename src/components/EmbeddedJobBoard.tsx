'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Job {
  id: string
  slug: string
  title: string
  company_name: string
  location: string
  is_remote: boolean
  workplace_type?: string
  compensation?: string
  role_category?: string
  skills_required?: string[]
  posted_date?: string
  hours_per_week?: string
}

interface EmbeddedJobBoardProps {
  defaultDepartment?: string
  defaultLocation?: string
  defaultWorkType?: string
  jobsPerPage?: number
  showFilters?: boolean
  title?: string
  accentColor?: string // 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'indigo'
}

const DEPARTMENT_OPTIONS = [
  { value: '', label: 'All Departments' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Sales', label: 'Sales' },
  { value: 'HR', label: 'HR' },
  { value: 'Product', label: 'Product' },
]

const LOCATION_OPTIONS = [
  { value: '', label: 'All UK Locations' },
  { value: 'London', label: 'London' },
  { value: 'Manchester', label: 'Manchester' },
  { value: 'Birmingham', label: 'Birmingham' },
  { value: 'Bristol', label: 'Bristol' },
  { value: 'Edinburgh', label: 'Edinburgh' },
  { value: 'Remote', label: 'Remote' },
]

const WORK_TYPE_OPTIONS = [
  { value: '', label: 'All Work Types' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
]

// Role-specific images - expanded pool for variety
const ROLE_IMAGES: Record<string, string[]> = {
  'Finance': [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
  ],
  'Engineering': [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop',
  ],
  'Marketing': [
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop',
  ],
  'Operations': [
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1557425955-df376b5903c8?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=400&h=250&fit=crop',
  ],
  'HR': [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop',
  ],
  'Product': [
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1558403194-611308249627?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=250&fit=crop',
  ],
  'Sales': [
    'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=400&h=250&fit=crop',
  ],
  'Security': [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
  ],
  'default': [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=250&fit=crop',
  ],
}

function getJobImage(jobId: string, roleCategory?: string): string {
  const hash = jobId.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)
  const images = ROLE_IMAGES[roleCategory || ''] || ROLE_IMAGES.default
  return images[Math.abs(hash) % images.length]
}

function formatPostedDate(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  return `${Math.floor(diffDays / 7)} weeks ago`
}

export function EmbeddedJobBoard({
  defaultDepartment = '',
  defaultLocation = '',
  defaultWorkType = '',
  jobsPerPage = 9,
  showFilters = true,
  title = 'Latest Jobs',
  accentColor = 'emerald',
}: EmbeddedJobBoardProps) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [totalJobs, setTotalJobs] = useState(0)
  const [loading, setLoading] = useState(true)
  const [department, setDepartment] = useState(defaultDepartment)
  const [location, setLocation] = useState(defaultLocation)
  const [workType, setWorkType] = useState(defaultWorkType)
  const [page, setPage] = useState(1)

  const accentClasses = {
    emerald: { bg: 'bg-emerald-600', hover: 'hover:bg-emerald-700', text: 'text-emerald-600', ring: 'focus:ring-emerald-500' },
    blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600', ring: 'focus:ring-blue-500' },
    amber: { bg: 'bg-amber-600', hover: 'hover:bg-amber-700', text: 'text-amber-600', ring: 'focus:ring-amber-500' },
    purple: { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-purple-600', ring: 'focus:ring-purple-500' },
    red: { bg: 'bg-red-600', hover: 'hover:bg-red-700', text: 'text-red-600', ring: 'focus:ring-red-500' },
    indigo: { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-700', text: 'text-indigo-600', ring: 'focus:ring-indigo-500' },
  }
  const accent = accentClasses[accentColor as keyof typeof accentClasses] || accentClasses.emerald

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (department) params.set('role', department)
      if (location) params.set('location', location)
      if (workType) params.set('remote', workType)
      params.set('page', page.toString())
      params.set('limit', jobsPerPage.toString())

      const url = `/api/jobs/search?${params.toString()}`
      console.log('[EmbeddedJobBoard] Fetching:', url)
      const response = await fetch(url)
      console.log('[EmbeddedJobBoard] Response status:', response.status)
      if (response.ok) {
        const data = await response.json()
        console.log('[EmbeddedJobBoard] Got', data.total, 'total jobs')
        setJobs(data.jobs || [])
        setTotalJobs(data.total || 0)
      } else {
        console.error('[EmbeddedJobBoard] API returned error:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('[EmbeddedJobBoard] Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }, [department, location, workType, page, jobsPerPage])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  useEffect(() => {
    setPage(1)
  }, [department, location, workType])

  const totalPages = Math.ceil(totalJobs / jobsPerPage)

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${accent.text}`}>{totalJobs}</span>
            <span className="text-gray-600">jobs found</span>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={`w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 ${accent.ring} focus:border-transparent transition-colors`}
              >
                {DEPARTMENT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 ${accent.ring} focus:border-transparent transition-colors`}
              >
                {LOCATION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="workType" className="block text-sm font-medium text-gray-700 mb-1">
                Work Type
              </label>
              <select
                id="workType"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className={`w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 ${accent.ring} focus:border-transparent transition-colors`}
              >
                {WORK_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Jobs List */}
      <div className="p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs match your filters</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
            <button
              onClick={() => { setDepartment(''); setLocation(''); setWorkType(''); }}
              className={`px-6 py-2.5 ${accent.bg} text-white rounded-lg ${accent.hover} font-semibold transition-colors`}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/fractional-job/${job.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={getJobImage(job.id, job.role_category)}
                      alt={job.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {job.role_category && (
                        <span className="bg-gray-800/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {job.role_category}
                        </span>
                      )}
                      {job.is_remote && (
                        <span className="bg-teal-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          Remote
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-bold text-white text-lg leading-tight line-clamp-2">
                        {job.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-gray-700 font-medium mb-2">{job.company_name}</p>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {job.location}
                      </span>
                      {job.compensation && (
                        <span className="font-semibold text-gray-900">{job.compensation}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      {job.posted_date && (
                        <span className="text-xs text-gray-500">{formatPostedDate(job.posted_date)}</span>
                      )}
                      <span className={`text-sm font-semibold ${accent.text} group-hover:underline`}>
                        View Job →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-4 border-t border-gray-200">
                {page > 1 && (
                  <button
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    ← Previous
                  </button>
                )}
                <span className="px-4 py-2 text-gray-600">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <button
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    Next →
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 p-6 text-center">
        <Link
          href="/fractional-jobs-uk"
          className={`inline-flex items-center gap-2 px-8 py-3 ${accent.bg} text-white rounded-lg font-semibold ${accent.hover} transition-colors`}
        >
          View All UK Jobs
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default EmbeddedJobBoard
