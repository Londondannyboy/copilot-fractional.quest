'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'

// Dynamic import to avoid SSR issues
const ForceGraph3DLib = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-gray-900 rounded-xl">
      <div className="text-white text-center">
        <div className="text-4xl mb-2 animate-pulse">🌌</div>
        <div>Loading graph...</div>
      </div>
    </div>
  )
})

export interface GraphNode {
  id: string
  type: 'user' | 'interest' | 'role' | 'location' | 'skill' | 'fact'
  label: string
  data?: Record<string, unknown>
}

export interface GraphEdge {
  source: string
  target: string
  type: string
  label?: string
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
  title?: string
}

interface Props {
  data: GraphData
  height?: number
}

// Node colors
const NODE_COLORS: Record<string, string> = {
  user: '#8B5CF6',      // Purple
  interest: '#EC4899',  // Pink
  role: '#3B82F6',      // Blue
  location: '#10B981',  // Emerald
  skill: '#F59E0B',     // Amber
  fact: '#6366F1'       // Indigo
}

// Node sizes
const NODE_SIZES: Record<string, number> = {
  user: 18,
  interest: 12,
  role: 14,
  location: 12,
  skill: 11,
  fact: 10
}

export function ForceGraph3DComponent({ data, height = 400 }: Props) {
  const graphRef = useRef<any>(null)
  const [isClient, setIsClient] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 500, height })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // For CopilotKit sidebar, use a fixed width
      setDimensions({
        width: Math.min(window.innerWidth - 100, 500),
        height
      })
    }
  }, [height])

  // Transform data for the graph library
  const graphData = {
    nodes: data.nodes || [],
    links: (data.edges || []).map(edge => ({
      source: edge.source,
      target: edge.target,
      label: edge.label
    }))
  }

  // Initial camera setup
  useEffect(() => {
    if (graphRef.current && graphData.nodes.length > 0) {
      try {
        const camera = graphRef.current.camera()
        if (camera) {
          camera.position.set(0, 0, 300)
          camera.lookAt(0, 0, 0)
        }

        // Add lighting
        const scene = graphRef.current.scene()
        if (scene) {
          const ambientLight = new THREE.AmbientLight(0x404040, 2)
          scene.add(ambientLight)

          const light = new THREE.PointLight(0xFFFFFF, 1, 1000)
          light.position.set(100, 100, 100)
          scene.add(light)
        }
      } catch (e) {
        console.warn('ForceGraph3D init error:', e)
      }
    }
  }, [graphData.nodes.length])

  // Position user node at center
  useEffect(() => {
    if (!graphRef.current || !data.nodes) return

    const userNode = data.nodes.find(n => n.type === 'user') as any
    if (userNode) {
      userNode.fx = 0
      userNode.fy = 0
      userNode.fz = 0
    }
  }, [data.nodes])

  // Node appearance
  const nodeThreeObject = useCallback((node: any) => {
    const baseColor = NODE_COLORS[node.type] || '#666666'
    const size = NODE_SIZES[node.type] || 10

    const geometry = new THREE.SphereGeometry(size, 16, 16)
    const material = new THREE.MeshLambertMaterial({
      color: baseColor,
      emissive: node.type === 'user' ? baseColor : '#000000',
      emissiveIntensity: node.type === 'user' ? 0.3 : 0
    })
    const mesh = new THREE.Mesh(geometry, material)

    // Add label
    const sprite = new SpriteText(node.label)
    sprite.color = '#FFFFFF'
    sprite.textHeight = 6
    sprite.position.set(0, size + 8, 0)
    mesh.add(sprite)

    // Add glow for user node
    if (node.type === 'user') {
      const glowGeometry = new THREE.SphereGeometry(size * 1.3, 16, 16)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: baseColor,
        transparent: true,
        opacity: 0.25
      })
      mesh.add(new THREE.Mesh(glowGeometry, glowMaterial))
    }

    return mesh
  }, [])

  // Handle node click - zoom in
  const handleNodeClick = useCallback((node: any) => {
    if (!graphRef.current) return
    const distance = 100
    const distRatio = 1 + distance / Math.hypot(node.x || 0, node.y || 0, node.z || 0)
    graphRef.current.cameraPosition(
      { x: (node.x || 0) * distRatio, y: (node.y || 0) * distRatio, z: (node.z || 0) * distRatio },
      node,
      1000
    )
  }, [])

  if (!isClient) {
    return (
      <div className="w-full rounded-xl bg-gray-900 flex items-center justify-center" style={{ height }}>
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!graphData.nodes || graphData.nodes.length === 0) {
    return (
      <div className="w-full rounded-xl bg-gray-900 flex items-center justify-center" style={{ height }}>
        <div className="text-white text-center">
          <div className="text-4xl mb-2">🌌</div>
          <div>No data yet</div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl overflow-hidden bg-gray-900 border border-gray-700">
      {data.title && (
        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
          <h3 className="text-white font-medium text-sm">{data.title}</h3>
          <p className="text-gray-400 text-xs">{graphData.nodes.length} nodes • {graphData.links.length} connections</p>
        </div>
      )}
      <ForceGraph3DLib
        ref={graphRef}
        graphData={graphData}
        nodeThreeObject={nodeThreeObject}
        linkColor={() => 'rgba(255, 255, 255, 0.2)'}
        linkWidth={1}
        linkOpacity={0.6}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.005}
        onNodeClick={handleNodeClick}
        backgroundColor="#111827"
        showNavInfo={false}
        enableNavigationControls={true}
        width={dimensions.width}
        height={height}
        warmupTicks={50}
        cooldownTime={500}
      />
    </div>
  )
}

// Loading placeholder
export function ForceGraphLoading({ title }: { title?: string }) {
  return (
    <div className="w-full h-[400px] rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="text-4xl mb-2 animate-pulse">🌌</div>
        <div className="animate-pulse">{title || 'Building your graph...'}</div>
      </div>
    </div>
  )
}
