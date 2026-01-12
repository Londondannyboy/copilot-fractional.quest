'use client'

import { useState, useEffect } from 'react'
import { HotJobsLines } from './HotJobsLines'

interface HotJobsProps {
  location?: string
  maxJobs?: number
  title?: string
  className?: string
}

export function HotJobs({
  location,
  maxJobs = 6,
  title = 'Hot Jobs',
  className = ''
}: HotJobsProps) {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        const params = new URLSearchParams()
        if (location) params.set('location', location)
        params.set('limit', maxJobs.toString())

        const response = await fetch(`/api/jobs/search?${params.toString()}`)
        if (response.ok) {
          const data = await response.json()
          setJobs(data.jobs || [])
        }
      } catch (error) {
        console.error('Error fetching hot jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [location, maxJobs])

  if (loading) {
    return (
      <div className={`bg-white border border-gray-200 rounded-xl p-6 ${className}`}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (jobs.length === 0) return null

  return (
    <HotJobsLines
      jobs={jobs}
      title={title}
      maxJobs={maxJobs}
      className={`${className} rounded-xl border`}
      showViewAll={true}
      viewAllHref="/fractional-jobs-uk"
    />
  )
}
