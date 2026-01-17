'use client'

import { useState, useEffect } from 'react'

interface MatchCriteria {
  label: string
  score: number // 0-100
  description?: string
}

interface JobMatchScoreProps {
  jobTitle: string
  company?: string
  location?: string
  criteria?: MatchCriteria[]
  overallScore?: number
  recommendation?: string
}

/**
 * JobMatchScore - Shows how well a job matches user's profile
 *
 * Can be rendered by CopilotKit agent via compose_mdx_response tool:
 *
 * ```mdx
 * <JobMatchScore
 *   jobTitle="Fractional CTO"
 *   company="TechStartup Ltd"
 *   location="London"
 *   overallScore={85}
 *   criteria={[
 *     { label: "Role Match", score: 90, description: "Strong CTO experience" },
 *     { label: "Location", score: 100, description: "Preferred London location" },
 *     { label: "Day Rate", score: 75, description: "Within your target range" }
 *   ]}
 *   recommendation="Strong match! This role aligns well with your experience."
 * />
 * ```
 */
export default function JobMatchScore({
  jobTitle,
  company,
  location,
  criteria = [],
  overallScore = 0,
  recommendation,
}: JobMatchScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  // Animate the overall score
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(overallScore)
    }, 100)
    return () => clearTimeout(timer)
  }, [overallScore])

  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600'
    if (score >= 60) return 'text-amber-600'
    return 'text-red-500'
  }

  const getBarColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500'
    if (score >= 60) return 'bg-amber-500'
    return 'bg-red-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent Match'
    if (score >= 80) return 'Strong Match'
    if (score >= 60) return 'Good Fit'
    if (score >= 40) return 'Moderate Fit'
    return 'Low Match'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-lg">{jobTitle}</h3>
            {company && (
              <p className="text-indigo-100 text-sm">{company}</p>
            )}
            {location && (
              <p className="text-indigo-200 text-xs flex items-center gap-1 mt-1">
                <span>📍</span> {location}
              </p>
            )}
          </div>
          <div className="text-center">
            <div className={`text-4xl font-black ${animatedScore >= 80 ? 'text-white' : 'text-indigo-200'}`}>
              {animatedScore}%
            </div>
            <div className="text-xs text-indigo-200 uppercase tracking-wider">
              Match Score
            </div>
          </div>
        </div>
      </div>

      {/* Match Criteria */}
      {criteria.length > 0 && (
        <div className="px-6 py-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Match Breakdown</span>
            <span className={`text-sm font-bold ${getScoreColor(overallScore)}`}>
              {getScoreLabel(overallScore)}
            </span>
          </div>

          {criteria.map((criterion, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{criterion.label}</span>
                <span className={`font-semibold ${getScoreColor(criterion.score)}`}>
                  {criterion.score}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getBarColor(criterion.score)} transition-all duration-700 ease-out`}
                  style={{ width: `${criterion.score}%` }}
                />
              </div>
              {criterion.description && (
                <p className="text-xs text-gray-500">{criterion.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Recommendation */}
      {recommendation && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <p className="text-sm text-gray-700">{recommendation}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
        <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
          View Full Details
        </button>
        <button className="px-4 py-2 border border-gray-300 hover:border-indigo-300 rounded-lg text-sm font-medium text-gray-700 transition-colors">
          Save Job
        </button>
      </div>
    </div>
  )
}
