'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core'

// Document state that can be modified by conversation
interface DocumentState {
  filters: {
    location: string
    role: string
    remote: boolean
    minRate: number
    maxRate: number
  }
  highlights: string[] // Sections to highlight
  expandedSections: string[]
  userQuery: string
  lastUpdate: string
}

interface DocumentContextType {
  state: DocumentState
  updateFilters: (filters: Partial<DocumentState['filters']>) => void
  highlightSection: (sectionId: string) => void
  expandSection: (sectionId: string) => void
  setUserQuery: (query: string) => void
}

const DocumentContext = createContext<DocumentContextType | null>(null)

// Default state for when context is not available
const defaultDocumentState: DocumentState = {
  filters: {
    location: '',
    role: '',
    remote: false,
    minRate: 0,
    maxRate: 2000,
  },
  highlights: [],
  expandedSections: [],
  userQuery: '',
  lastUpdate: new Date().toISOString(),
}

const defaultContext: DocumentContextType = {
  state: defaultDocumentState,
  updateFilters: () => {},
  highlightSection: () => {},
  expandSection: () => {},
  setUserQuery: () => {},
}

export function useDocument() {
  const ctx = useContext(DocumentContext)
  // Return default context instead of throwing - makes components more resilient
  if (!ctx) {
    console.warn('useDocument called outside IntelligentDocument - using default state')
    return defaultContext
  }
  return ctx
}

interface IntelligentDocumentProps {
  children: ReactNode
  initialFilters?: Partial<DocumentState['filters']>
  pageContext: string // e.g., "CFO jobs in London"
}

/**
 * IntelligentDocument - The "thinking document" wrapper
 *
 * This component makes the entire page intelligent:
 * - State flows between CopilotKit conversation and page content
 * - Agent can modify what the page shows via actions
 * - Components inside can react to conversation
 */
export function IntelligentDocument({
  children,
  initialFilters = {},
  pageContext
}: IntelligentDocumentProps) {
  const [state, setState] = useState<DocumentState>({
    filters: {
      location: initialFilters.location || '',
      role: initialFilters.role || '',
      remote: initialFilters.remote || false,
      minRate: initialFilters.minRate || 0,
      maxRate: initialFilters.maxRate || 2000,
    },
    highlights: [],
    expandedSections: [],
    userQuery: '',
    lastUpdate: new Date().toISOString(),
  })

  // Make document state readable by CopilotKit
  useCopilotReadable({
    description: "Current document state including filters and user preferences",
    value: JSON.stringify({
      pageContext,
      currentFilters: state.filters,
      highlightedSections: state.highlights,
      userQuery: state.userQuery,
    })
  })

  // Action: Update filters (e.g., "Show me remote jobs only")
  useCopilotAction({
    name: "update_document_filters",
    description: "Update the page filters based on user request. Use this when user asks to filter, show, or focus on specific criteria like location, remote work, salary range, etc.",
    parameters: [
      { name: "location", type: "string", description: "Filter by location (e.g., 'London', 'Manchester', 'Remote')", required: false },
      { name: "role", type: "string", description: "Filter by role type (e.g., 'CFO', 'CTO', 'CMO')", required: false },
      { name: "remote", type: "boolean", description: "Show only remote jobs", required: false },
      { name: "minRate", type: "number", description: "Minimum day rate in GBP", required: false },
      { name: "maxRate", type: "number", description: "Maximum day rate in GBP", required: false },
    ],
    handler: async ({ location, role, remote, minRate, maxRate }: { location?: string; role?: string; remote?: boolean; minRate?: number; maxRate?: number }) => {
      setState(prev => ({
        ...prev,
        filters: {
          ...prev.filters,
          ...(location !== undefined && { location }),
          ...(role !== undefined && { role }),
          ...(remote !== undefined && { remote }),
          ...(minRate !== undefined && { minRate }),
          ...(maxRate !== undefined && { maxRate }),
        },
        lastUpdate: new Date().toISOString(),
      }))

      const updates: string[] = []
      if (location) updates.push(`location to ${location}`)
      if (role) updates.push(`role to ${role}`)
      if (remote !== undefined) updates.push(remote ? 'remote only' : 'all work types')
      if (minRate) updates.push(`min rate to £${minRate}`)
      if (maxRate) updates.push(`max rate to £${maxRate}`)

      return `Updated page filters: ${updates.join(', ')}. The document content has updated to reflect these changes.`
    }
  })

  // Action: Highlight a section (e.g., "Show me the salary data")
  useCopilotAction({
    name: "highlight_section",
    description: "Highlight or focus on a specific section of the document. Use when user wants to focus on salary, jobs, market trends, etc.",
    parameters: [
      { name: "section", type: "string", description: "Section to highlight: 'salary', 'jobs', 'market', 'skills', 'companies'", required: true },
    ],
    handler: async ({ section }: { section: string }) => {
      setState(prev => ({
        ...prev,
        highlights: [...prev.highlights.filter(s => s !== section), section],
        expandedSections: [...prev.expandedSections.filter(s => s !== section), section],
      }))
      return `Highlighted the ${section} section. It should now be visually emphasized on the page.`
    }
  })

  // Action: Clear highlights
  useCopilotAction({
    name: "clear_highlights",
    description: "Clear all section highlights and return to normal view",
    parameters: [],
    handler: async () => {
      setState(prev => ({
        ...prev,
        highlights: [],
      }))
      return "Cleared all highlights. The page is back to normal view."
    }
  })

  const updateFilters = useCallback((filters: Partial<DocumentState['filters']>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
      lastUpdate: new Date().toISOString(),
    }))
  }, [])

  const highlightSection = useCallback((sectionId: string) => {
    setState(prev => ({
      ...prev,
      highlights: [...prev.highlights, sectionId],
    }))
  }, [])

  const expandSection = useCallback((sectionId: string) => {
    setState(prev => ({
      ...prev,
      expandedSections: [...prev.expandedSections, sectionId],
    }))
  }, [])

  const setUserQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, userQuery: query }))
  }, [])

  return (
    <DocumentContext.Provider value={{
      state,
      updateFilters,
      highlightSection,
      expandSection,
      setUserQuery
    }}>
      <div className="intelligent-document" data-last-update={state.lastUpdate}>
        {children}
      </div>
    </DocumentContext.Provider>
  )
}

export default IntelligentDocument
