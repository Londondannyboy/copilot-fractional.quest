'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
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

interface Props {
  userName: string
  items: ProfileItem[]
  onUserNodePositionChange?: (position: { x: number; y: number }) => void
}

export function VoiceGraphInterface({ userName, items, onUserNodePositionChange }: Props) {
  const graphRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [mounted, setMounted] = useState(false)

  // Mount check
  useEffect(() => {
    setMounted(true)
  }, [])

  // Resize handler
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Build graph data
  const graphData = useCallback(() => {
    const nodes: GraphNode[] = [{
      id: 'user',
      name: userName,
      color: COLORS.user,
      size: 30
    }]

    const links: GraphLink[] = []

    const typeToColor: Record<string, string> = {
      location: COLORS.location,
      role_preference: COLORS.role,
      company: COLORS.company,
      skill: COLORS.skill,
    }

    items.forEach((item) => {
      const nodeId = `item_${item.id}`
      nodes.push({
        id: nodeId,
        name: item.value,
        color: typeToColor[item.item_type] || COLORS.skill,
        size: 15,
        profileItemId: item.id
      })
      links.push({ source: 'user', target: nodeId })
    })

    return { nodes, links }
  }, [items, userName])

  const data = graphData()

  // Track user node position
  useEffect(() => {
    if (!graphRef.current || !mounted) return

    const track = () => {
      try {
        const coords = graphRef.current?.graph2ScreenCoords?.(0, 0, 0)
        if (coords && onUserNodePositionChange) {
          onUserNodePositionChange({ x: coords.x, y: coords.y })
        }
      } catch (e) {
        // ignore
      }
    }

    const interval = setInterval(track, 100)
    return () => clearInterval(interval)
  }, [mounted, onUserNodePositionChange])

  // Fix user node at center
  useEffect(() => {
    if (!graphRef.current) return
    const userNode = data.nodes.find(n => n.id === 'user') as any
    if (userNode) {
      userNode.fx = 0
      userNode.fy = 0
      userNode.fz = 0
    }
  }, [data.nodes])

  // Camera setup
  useEffect(() => {
    if (!graphRef.current || !mounted) return

    const setup = () => {
      try {
        graphRef.current?.cameraPosition?.({ x: 0, y: 0, z: 200 })
      } catch (e) {
        // ignore
      }
    }

    setup()
    setTimeout(setup, 500)
    setTimeout(setup, 1000)
  }, [mounted, data.nodes.length])

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
        graphData={data}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#111827"
        nodeLabel="name"
        nodeColor={(node: any) => node.color}
        nodeVal={(node: any) => node.size}
        nodeOpacity={1}
        linkColor={() => '#ffffff40'}
        linkWidth={2}
        linkOpacity={0.5}
        enableNodeDrag={false}
        enableNavigationControls={true}
        showNavInfo={false}
      />
    </div>
  )
}
