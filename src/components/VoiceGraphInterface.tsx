'use client'

import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import for 3D graph - MUST be client-side only
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
  loading: () => null
})

export interface ProfileItem {
  id: number
  item_type: string
  value: string
  metadata: Record<string, unknown>
  confirmed: boolean
}

interface GraphNode {
  id: string
  name: string
  color: string
  size: number
  profileItemId?: number
  // Force graph position props
  fx?: number
  fy?: number
  fz?: number
}

interface GraphLink {
  source: string
  target: string
}

// Colors
const COLORS = {
  user: '#8B5CF6',
  location: '#10B981',
  role: '#3B82F6',
  company: '#EC4899',
  skill: '#F59E0B',
}

const TYPE_TO_COLOR: Record<string, string> = {
  location: COLORS.location,
  role_preference: COLORS.role,
  company: COLORS.company,
  skill: COLORS.skill,
}

interface Props {
  userName: string
  items: ProfileItem[]
  onUserNodePositionChange?: (position: { x: number; y: number }) => void
}

export function VoiceGraphInterface({ userName, items, onUserNodePositionChange }: Props) {
  const graphRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const positionCallbackRef = useRef(onUserNodePositionChange)
  const lastPositionRef = useRef<{ x: number; y: number } | null>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [mounted, setMounted] = useState(false)

  // Keep callback ref updated without triggering re-renders
  useEffect(() => {
    positionCallbackRef.current = onUserNodePositionChange
  }, [onUserNodePositionChange])

  // Mount check
  useEffect(() => {
    setMounted(true)
  }, [])

  // Resize handler - debounced
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const updateSize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth
        const newHeight = containerRef.current.clientHeight
        setDimensions(prev => {
          // Only update if significantly different (>10px) to prevent minor flickers
          if (Math.abs(prev.width - newWidth) > 10 || Math.abs(prev.height - newHeight) > 10) {
            return { width: newWidth, height: newHeight }
          }
          return prev
        })
      }
    }

    const debouncedUpdate = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateSize, 100)
    }

    updateSize()
    window.addEventListener('resize', debouncedUpdate)
    return () => {
      window.removeEventListener('resize', debouncedUpdate)
      clearTimeout(timeoutId)
    }
  }, [])

  // Build graph data - memoized properly to prevent flickering
  // Only rebuild when items array content actually changes
  const itemsKey = useMemo(() =>
    items.map(i => `${i.id}:${i.value}`).join(','),
    [items]
  )

  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [{
      id: 'user',
      name: userName,
      color: COLORS.user,
      size: 30,
      // Fix user node at center
      fx: 0,
      fy: 0,
      fz: 0,
    }]

    const links: GraphLink[] = []

    items.forEach((item) => {
      const nodeId = `item_${item.id}`
      nodes.push({
        id: nodeId,
        name: item.value,
        color: TYPE_TO_COLOR[item.item_type] || COLORS.skill,
        size: 15,
        profileItemId: item.id
      })
      links.push({ source: 'user', target: nodeId })
    })

    return { nodes, links }
  }, [itemsKey, userName, items])

  // Track user node position using requestAnimationFrame for smooth updates
  useEffect(() => {
    if (!mounted) return

    let animationId: number
    let isTracking = true

    const trackPosition = () => {
      if (!isTracking || !graphRef.current) {
        if (isTracking) animationId = requestAnimationFrame(trackPosition)
        return
      }

      try {
        const coords = graphRef.current.graph2ScreenCoords?.(0, 0, 0)
        if (coords && positionCallbackRef.current) {
          // Only update if position changed significantly (>2px)
          const last = lastPositionRef.current
          if (!last || Math.abs(last.x - coords.x) > 2 || Math.abs(last.y - coords.y) > 2) {
            lastPositionRef.current = { x: coords.x, y: coords.y }
            positionCallbackRef.current({ x: coords.x, y: coords.y })
          }
        }
      } catch (e) {
        // ignore
      }

      if (isTracking) {
        animationId = requestAnimationFrame(trackPosition)
      }
    }

    // Start tracking after a short delay to let graph initialize
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(trackPosition)
    }, 500)

    return () => {
      isTracking = false
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationId)
    }
  }, [mounted])

  // Camera setup - only run once
  useEffect(() => {
    if (!graphRef.current || !mounted) return

    const setup = () => {
      try {
        graphRef.current?.cameraPosition?.({ x: 0, y: 0, z: 200 })
      } catch (e) {
        // ignore
      }
    }

    const timeoutId1 = setTimeout(setup, 100)
    const timeoutId2 = setTimeout(setup, 500)

    return () => {
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
    }
  }, [mounted])

  // Memoized render functions to prevent re-renders
  const nodeColor = useCallback((node: any) => node.color, [])
  const nodeVal = useCallback((node: any) => node.size, [])
  const linkColor = useCallback(() => '#ffffff40', [])

  if (!mounted) {
    return (
      <div ref={containerRef} className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading graph...</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full h-full bg-gray-900">
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#111827"
        nodeLabel="name"
        nodeColor={nodeColor}
        nodeVal={nodeVal}
        nodeOpacity={1}
        linkColor={linkColor}
        linkWidth={2}
        linkOpacity={0.5}
        enableNodeDrag={false}
        enableNavigationControls={true}
        showNavInfo={false}
        cooldownTime={1000}
        warmupTicks={50}
      />
    </div>
  )
}
