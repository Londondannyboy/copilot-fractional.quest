'use client'

import { useEffect, useState, useMemo } from 'react'
import { useDocument } from './IntelligentDocument'
import Link from 'next/link'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'

// ==============================================
// PERSONALIZED GREETING
// ==============================================
interface PersonalizedGreetingProps {
  userName?: string
  userRole?: string
  userLocation?: string
}

export function PersonalizedGreeting({
  userName,
  userRole,
  userLocation
}: PersonalizedGreetingProps) {
  const { state } = useDocument()
  const timeOfDay = new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'

  if (!userName) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
        <p className="text-lg text-gray-700">
          Good {timeOfDay}! This page adapts to your needs.
          <span className="text-blue-600 font-medium"> Try asking me to filter jobs or show specific data.</span>
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
      <p className="text-lg text-gray-700">
        Good {timeOfDay}, <span className="font-semibold text-gray-900">{userName}</span>!
        {userRole && (
          <> Looking for <span className="font-medium text-blue-600">{userRole}</span> opportunities</>
        )}
        {userLocation && (
          <> in <span className="font-medium text-blue-600">{userLocation}</span></>
        )}
        {state.filters.remote && (
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            Remote Only
          </span>
        )}
      </p>
      {state.userQuery && (
        <p className="text-sm text-gray-500 mt-2">
          Current focus: "{state.userQuery}"
        </p>
      )}
    </div>
  )
}

// ==============================================
// LIVE MARKET CHART - Responds to filters
// ==============================================
interface LiveMarketChartProps {
  role?: string
  location?: string
  type?: 'bar' | 'area'
}

const SALARY_DATA = {
  'CFO': { london: { min: 800, avg: 1200, max: 1800 }, uk: { min: 600, avg: 950, max: 1400 } },
  'CTO': { london: { min: 900, avg: 1300, max: 2000 }, uk: { min: 700, avg: 1050, max: 1600 } },
  'CMO': { london: { min: 750, avg: 1100, max: 1600 }, uk: { min: 550, avg: 850, max: 1300 } },
  'COO': { london: { min: 850, avg: 1250, max: 1900 }, uk: { min: 650, avg: 1000, max: 1500 } },
  'CHRO': { london: { min: 700, avg: 1000, max: 1500 }, uk: { min: 500, avg: 800, max: 1200 } },
  'CISO': { london: { min: 950, avg: 1400, max: 2100 }, uk: { min: 750, avg: 1100, max: 1700 } },
}

export function LiveMarketChart({ role, location, type = 'bar' }: LiveMarketChartProps) {
  const { state } = useDocument()

  // Use document filters if props not provided
  const effectiveRole = role || state.filters.role || 'CFO'
  const effectiveLocation = location || state.filters.location || 'London'
  const isLondon = effectiveLocation.toLowerCase().includes('london')

  const isHighlighted = state.highlights.includes('salary') || state.highlights.includes('market')

  // Build chart data based on filters
  const chartData = useMemo(() => {
    if (effectiveRole && SALARY_DATA[effectiveRole as keyof typeof SALARY_DATA]) {
      const data = SALARY_DATA[effectiveRole as keyof typeof SALARY_DATA]
      const rates = isLondon ? data.london : data.uk
      return [
        { name: 'Min Rate', value: rates.min, fill: '#94a3b8' },
        { name: 'Avg Rate', value: rates.avg, fill: '#3b82f6' },
        { name: 'Max Rate', value: rates.max, fill: '#10b981' },
      ]
    }

    // Show all roles comparison
    return Object.entries(SALARY_DATA).map(([roleName, data]) => ({
      name: roleName,
      min: isLondon ? data.london.min : data.uk.min,
      avg: isLondon ? data.london.avg : data.uk.avg,
      max: isLondon ? data.london.max : data.uk.max,
    }))
  }, [effectiveRole, isLondon])

  const isSingleRole = effectiveRole && SALARY_DATA[effectiveRole as keyof typeof SALARY_DATA]

  return (
    <div className={`bg-white rounded-xl border p-6 mb-8 transition-all duration-500 ${
      isHighlighted
        ? 'border-blue-500 shadow-lg shadow-blue-100 ring-2 ring-blue-200'
        : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900">
            {isSingleRole ? `${effectiveRole} Day Rates` : 'Fractional Executive Day Rates'}
          </h3>
          <p className="text-sm text-gray-500">
            {isLondon ? 'London' : 'UK'} market rates (£/day)
            {isHighlighted && <span className="ml-2 text-blue-600 font-medium">• Highlighted</span>}
          </p>
        </div>
        {state.filters.minRate > 0 && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            Min £{state.filters.minRate}+
          </span>
        )}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' && !isSingleRole ? (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                formatter={(value) => [`£${value}`, '']}
              />
              <Area type="monotone" dataKey="avg" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Area type="monotone" dataKey="max" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
          ) : (
            <BarChart data={chartData} layout={isSingleRole ? 'vertical' : 'horizontal'}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              {isSingleRole ? (
                <>
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    formatter={(value) => [`£${value ?? 0}/day`, '']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                </>
              ) : (
                <>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    formatter={(value) => [`£${value ?? 0}/day`, '']}
                  />
                  <Bar dataKey="avg" fill="#3b82f6" name="Avg Rate" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="max" fill="#10b981" name="Max Rate" radius={[4, 4, 0, 0]} />
                </>
              )}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ==============================================
// LIVE JOB GRID - Responds to filters
// ==============================================
interface Job {
  id: string
  slug: string
  title: string
  company_name: string
  location: string
  compensation?: string
  is_remote?: boolean
  role_category?: string
}

interface LiveJobGridProps {
  role?: string
  location?: string
  limit?: number
}

export function LiveJobGrid({ role, location, limit = 6 }: LiveJobGridProps) {
  const { state } = useDocument()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  // Use document filters if props not provided
  const effectiveRole = role || state.filters.role
  const effectiveLocation = location || state.filters.location
  const isRemote = state.filters.remote

  const isHighlighted = state.highlights.includes('jobs')

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (effectiveRole) params.set('role', effectiveRole)
        if (effectiveLocation) params.set('location', effectiveLocation)
        if (isRemote) params.set('remote', 'true')
        params.set('limit', limit.toString())

        const response = await fetch(`/api/jobs/search?${params.toString()}`)
        const data = await response.json()
        setJobs(data.jobs || [])
        setTotal(data.total || 0)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [effectiveRole, effectiveLocation, isRemote, limit])

  return (
    <div className={`mb-8 transition-all duration-500 ${
      isHighlighted
        ? 'ring-2 ring-blue-200 rounded-xl p-4 bg-blue-50/50'
        : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900">
            {effectiveRole ? `${effectiveRole} Jobs` : 'Latest Jobs'}
            {effectiveLocation && ` in ${effectiveLocation}`}
          </h3>
          <p className="text-sm text-gray-500">
            {total} jobs found
            {isRemote && ' • Remote only'}
            {isHighlighted && <span className="ml-2 text-blue-600 font-medium">• Highlighted</span>}
          </p>
        </div>

        {/* Active filters display */}
        <div className="flex gap-2">
          {effectiveRole && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              {effectiveRole}
            </span>
          )}
          {effectiveLocation && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              {effectiveLocation}
            </span>
          )}
          {isRemote && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              Remote
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-32 animate-pulse" />
          ))}
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/fractional-job/${job.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-blue-300 transition-all group"
            >
              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {job.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{job.company_name}</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <span>{job.location}</span>
                {job.compensation && (
                  <span className="font-medium text-green-600">{job.compensation}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No jobs found with current filters. Try adjusting your criteria.
        </div>
      )}
    </div>
  )
}

// ==============================================
// ACTIVE FILTERS DISPLAY
// ==============================================
export function ActiveFilters() {
  const { state, updateFilters } = useDocument()

  const hasFilters = state.filters.location ||
    state.filters.role ||
    state.filters.remote ||
    state.filters.minRate > 0

  if (!hasFilters) return null

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center flex-wrap gap-2">
      <span className="text-sm text-gray-600 font-medium">Active filters:</span>

      {state.filters.role && (
        <button
          onClick={() => updateFilters({ role: '' })}
          className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
        >
          {state.filters.role}
          <span className="text-purple-400">×</span>
        </button>
      )}

      {state.filters.location && (
        <button
          onClick={() => updateFilters({ location: '' })}
          className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition-colors"
        >
          {state.filters.location}
          <span className="text-green-400">×</span>
        </button>
      )}

      {state.filters.remote && (
        <button
          onClick={() => updateFilters({ remote: false })}
          className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
        >
          Remote Only
          <span className="text-blue-400">×</span>
        </button>
      )}

      {state.filters.minRate > 0 && (
        <button
          onClick={() => updateFilters({ minRate: 0 })}
          className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm hover:bg-amber-200 transition-colors"
        >
          £{state.filters.minRate}+ /day
          <span className="text-amber-400">×</span>
        </button>
      )}
    </div>
  )
}

// ==============================================
// DOCUMENT SECTION - Highlightable wrapper
// ==============================================
interface DocumentSectionProps {
  id: string
  title?: string
  children: React.ReactNode
}

export function DocumentSection({ id, title, children }: DocumentSectionProps) {
  const { state } = useDocument()
  const isHighlighted = state.highlights.includes(id)
  // isExpanded could be used for collapsible sections in the future
  const _isExpanded = state.expandedSections.includes(id)
  void _isExpanded // Suppress unused warning

  return (
    <section
      id={id}
      className={`mb-8 transition-all duration-500 ${
        isHighlighted
          ? 'bg-blue-50 -mx-4 px-4 py-6 rounded-xl border-l-4 border-blue-500'
          : ''
      }`}
    >
      {title && (
        <h2 className={`text-2xl font-bold mb-4 ${isHighlighted ? 'text-blue-900' : 'text-gray-900'}`}>
          {title}
          {isHighlighted && (
            <span className="ml-3 text-sm font-normal text-blue-600 bg-blue-100 px-2 py-1 rounded">
              Focused
            </span>
          )}
        </h2>
      )}
      {children}
    </section>
  )
}

export default {
  PersonalizedGreeting,
  LiveMarketChart,
  LiveJobGrid,
  ActiveFilters,
  DocumentSection,
}
