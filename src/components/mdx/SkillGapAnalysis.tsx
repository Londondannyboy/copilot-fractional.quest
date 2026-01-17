'use client'

import { useState } from 'react'

interface Skill {
  name: string
  currentLevel: number // 0-100
  requiredLevel: number // 0-100
  priority: 'critical' | 'important' | 'nice-to-have'
  resources?: string[]
}

interface SkillGapAnalysisProps {
  targetRole: string
  skills?: Skill[]
  overallReadiness?: number
  recommendations?: string[]
}

/**
 * SkillGapAnalysis - Shows skills needed for a target role
 *
 * Agent can render via compose_mdx_response:
 * ```mdx
 * <SkillGapAnalysis
 *   targetRole="Fractional CTO"
 *   overallReadiness={72}
 *   skills={[
 *     { name: "Cloud Architecture", currentLevel: 80, requiredLevel: 90, priority: "critical" },
 *     { name: "Team Leadership", currentLevel: 85, requiredLevel: 80, priority: "important" }
 *   ]}
 *   recommendations={["Consider AWS Solutions Architect certification", "Join CTO peer groups"]}
 * />
 * ```
 */
export default function SkillGapAnalysis({
  targetRole,
  skills = [],
  overallReadiness = 0,
  recommendations = [],
}: SkillGapAnalysisProps) {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200'
      case 'important': return 'bg-amber-100 text-amber-700 border-amber-200'
      default: return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  const getGapStatus = (current: number, required: number) => {
    const gap = required - current
    if (gap <= 0) return { status: 'Ready', color: 'text-emerald-600', icon: '✓' }
    if (gap <= 10) return { status: 'Close', color: 'text-amber-600', icon: '○' }
    return { status: 'Gap', color: 'text-red-500', icon: '!' }
  }

  const getReadinessColor = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-teal-500'
    if (score >= 60) return 'from-amber-500 to-orange-500'
    return 'from-red-500 to-rose-500'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getReadinessColor(overallReadiness)} px-6 py-5`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium">Skills Analysis for</p>
            <h3 className="font-bold text-white text-xl">{targetRole}</h3>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-white">{overallReadiness}%</div>
            <div className="text-xs text-white/80 uppercase tracking-wider">Ready</div>
          </div>
        </div>
      </div>

      {/* Skills List */}
      {skills.length > 0 && (
        <div className="divide-y divide-gray-100">
          {skills.map((skill, idx) => {
            const gap = getGapStatus(skill.currentLevel, skill.requiredLevel)
            const isExpanded = expandedSkill === skill.name

            return (
              <div key={idx} className="px-6 py-4">
                <button
                  onClick={() => setExpandedSkill(isExpanded ? null : skill.name)}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${gap.color} bg-gray-100`}>
                        {gap.icon}
                      </span>
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(skill.priority)}`}>
                        {skill.priority}
                      </span>
                    </div>
                    <span className={`text-sm font-semibold ${gap.color}`}>{gap.status}</span>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-16">You</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-500"
                          style={{ width: `${skill.currentLevel}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600 w-8">{skill.currentLevel}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-16">Required</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-400 transition-all duration-500"
                          style={{ width: `${skill.requiredLevel}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600 w-8">{skill.requiredLevel}%</span>
                    </div>
                  </div>
                </button>

                {/* Expanded resources */}
                {isExpanded && skill.resources && skill.resources.length > 0 && (
                  <div className="mt-3 pl-9 space-y-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Resources</p>
                    {skill.resources.map((resource, rIdx) => (
                      <p key={rIdx} className="text-sm text-blue-600 hover:text-blue-800">
                        → {resource}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-gray-200">
          <p className="text-xs font-medium text-indigo-800 uppercase tracking-wider mb-3">
            Recommendations
          </p>
          <ul className="space-y-2">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-indigo-500 mt-0.5">💡</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action */}
      <div className="px-6 py-4 border-t border-gray-100">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors">
          Create Development Plan
        </button>
      </div>
    </div>
  )
}
