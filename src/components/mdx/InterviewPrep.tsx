'use client'

import { useState } from 'react'

interface Question {
  question: string
  category: 'behavioral' | 'technical' | 'strategic' | 'cultural'
  tips?: string[]
  exampleAnswer?: string
}

interface InterviewPrepProps {
  role: string
  company?: string
  questions?: Question[]
  keyTopics?: string[]
  preparationTime?: string
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'behavioral': return 'bg-blue-100 text-blue-700'
    case 'technical': return 'bg-purple-100 text-purple-700'
    case 'strategic': return 'bg-amber-100 text-amber-700'
    case 'cultural': return 'bg-emerald-100 text-emerald-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'behavioral': return '🎯'
    case 'technical': return '⚙️'
    case 'strategic': return '📊'
    case 'cultural': return '🤝'
    default: return '❓'
  }
}

/**
 * InterviewPrep - Interview preparation guide
 *
 * Agent can render via compose_mdx_response:
 * ```mdx
 * <InterviewPrep
 *   role="Fractional CTO"
 *   company="TechStartup Ltd"
 *   preparationTime="2-3 hours"
 *   keyTopics={["Technical architecture", "Team scaling", "AI/ML strategy"]}
 *   questions={[
 *     {
 *       question: "How would you approach our legacy system modernization?",
 *       category: "technical",
 *       tips: ["Ask about current stack first", "Discuss incremental approach"]
 *     }
 *   ]}
 * />
 * ```
 */
export default function InterviewPrep({
  role,
  company,
  questions = [],
  keyTopics = [],
  preparationTime = '1-2 hours',
}: InterviewPrepProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set())

  const toggleComplete = (idx: number) => {
    const newCompleted = new Set(completedQuestions)
    if (newCompleted.has(idx)) {
      newCompleted.delete(idx)
    } else {
      newCompleted.add(idx)
    }
    setCompletedQuestions(newCompleted)
  }

  const progress = questions.length > 0
    ? Math.round((completedQuestions.size / questions.length) * 100)
    : 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-violet-200 text-sm font-medium">Interview Prep</p>
            <h3 className="font-bold text-white text-xl">{role}</h3>
            {company && (
              <p className="text-violet-100 text-sm mt-1">at {company}</p>
            )}
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-3xl">📝</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 py-3 bg-violet-50 border-b border-violet-100">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-violet-800">Preparation Progress</span>
          <span className="text-sm font-bold text-violet-600">{progress}%</span>
        </div>
        <div className="h-2 bg-violet-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-violet-600 mt-1">
          Est. time: {preparationTime}
        </p>
      </div>

      {/* Key Topics */}
      {keyTopics.length > 0 && (
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Key Topics to Research
          </p>
          <div className="flex flex-wrap gap-2">
            {keyTopics.map((topic, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Questions */}
      {questions.length > 0 && (
        <div className="divide-y divide-gray-100">
          {questions.map((q, idx) => {
            const isExpanded = expandedQuestion === idx
            const isCompleted = completedQuestions.has(idx)

            return (
              <div key={idx} className={`px-6 py-4 ${isCompleted ? 'bg-emerald-50' : ''}`}>
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleComplete(idx)}
                    className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-gray-300 hover:border-emerald-400'
                    }`}
                  >
                    {isCompleted && <span className="text-xs">✓</span>}
                  </button>

                  <div className="flex-1">
                    <button
                      onClick={() => setExpandedQuestion(isExpanded ? null : idx)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span>{getCategoryIcon(q.category)}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(q.category)}`}>
                          {q.category}
                        </span>
                      </div>
                      <p className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {q.question}
                      </p>
                    </button>

                    {isExpanded && (
                      <div className="mt-3 space-y-3">
                        {q.tips && q.tips.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Tips</p>
                            <ul className="space-y-1">
                              {q.tips.map((tip, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-2 text-sm text-gray-600">
                                  <span className="text-amber-500 mt-0.5">💡</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {q.exampleAnswer && (
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Example Approach</p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                              {q.exampleAnswer}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
        <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
          Practice with AI
        </button>
        <button className="px-4 py-2 border border-gray-300 hover:border-violet-300 rounded-lg text-sm font-medium text-gray-700 transition-colors">
          Save Progress
        </button>
      </div>
    </div>
  )
}
