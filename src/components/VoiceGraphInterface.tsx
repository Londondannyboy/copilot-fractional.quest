'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'

// Dynamic import for 3D graph
const ForceGraph3DLib = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <div className="text-white text-center">
        <div className="text-6xl mb-4 animate-pulse">🌐</div>
        <div className="text-xl">Loading your universe...</div>
      </div>
    </div>
  )
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
  type: 'user' | 'location' | 'role' | 'company' | 'skill'
  label: string
  profileItemId?: number
  x?: number
  y?: number
  z?: number
  fx?: number
  fy?: number
  fz?: number
}

interface GraphLink {
  source: string
  target: string
  label: string
}

// Node colors - vibrant for dark background
const NODE_COLORS: Record<string, string> = {
  user: '#8B5CF6',      // Purple - center
  location: '#10B981',  // Emerald
  role: '#3B82F6',      // Blue
  company: '#EC4899',   // Pink
  skill: '#F59E0B',     // Amber
}

// Node sizes - larger for visibility
const NODE_SIZES: Record<string, number> = {
  user: 35,
  location: 20,
  role: 22,
  company: 20,
  skill: 18,
}

interface Props {
  userId?: string
  userName: string
  items: ProfileItem[]
  isVoiceActive: boolean
  onVoiceToggle: () => void
  onNodeClick?: (item: ProfileItem) => void
  onUserNodePositionChange?: (position: { x: number; y: number }) => void
}

export function VoiceGraphInterface({
  userId,
  userName,
  items,
  isVoiceActive,
  onVoiceToggle,
  onNodeClick,
  onUserNodePositionChange
}: Props) {
  const graphRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [userNodePosition, setUserNodePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Transform profile items to graph data
  const graphData = useCallback(() => {
    const nodes: GraphNode[] = [
      { id: 'user', type: 'user', label: userName, fx: 0, fy: 0, fz: 0 }
    ]
    const links: GraphLink[] = []

    const typeMap: Record<string, GraphNode['type']> = {
      location: 'location',
      role_preference: 'role',
      company: 'company',
      skill: 'skill',
    }

    const edgeLabels: Record<string, string> = {
      location: 'Based in',
      role_preference: 'Targeting',
      company: 'Worked at',
      skill: 'Skilled in',
    }

    items.forEach((item) => {
      const nodeType = typeMap[item.item_type] || 'skill'
      const nodeId = `item_${item.id}`

      nodes.push({
        id: nodeId,
        type: nodeType,
        label: item.value,
        profileItemId: item.id,
      })

      links.push({
        source: 'user',
        target: nodeId,
        label: edgeLabels[item.item_type] || 'Related',
      })
    })

    return { nodes, links }
  }, [items, userName])

  const data = graphData()

  // Debug log
  useEffect(() => {
    console.log('VoiceGraphInterface - items:', items.length, 'nodes:', data.nodes.length, 'links:', data.links.length)
  }, [items, data])

  // Camera and lighting setup - run after graph mounts
  useEffect(() => {
    const initGraph = () => {
      if (!graphRef.current) return false

      try {
        // Set camera position - zoom in for immersive feel
        const camera = graphRef.current.camera()
        if (camera) {
          camera.position.set(0, 0, 150) // Closer
          camera.lookAt(0, 0, 0)
        }

        // Add dramatic lighting
        const scene = graphRef.current.scene()
        if (scene) {
          // Check if lights already added
          const existingLights = scene.children.filter((c: any) => c.isLight)
          if (existingLights.length < 3) {
            // Ambient light - brighter
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
            scene.add(ambientLight)

            // Point lights for dramatic effect
            const light1 = new THREE.PointLight(0x8B5CF6, 2, 500) // Purple
            light1.position.set(100, 100, 100)
            scene.add(light1)

            const light2 = new THREE.PointLight(0x3B82F6, 1.5, 500) // Blue
            light2.position.set(-100, -100, 100)
            scene.add(light2)
          }
        }

        // Center the graph on user node
        graphRef.current.centerAt(0, 0, 500)

        return true
      } catch (e) {
        console.warn('VoiceGraphInterface init error:', e)
        return false
      }
    }

    // Try to init immediately and also after a delay (graph may not be ready)
    initGraph()
    const timer = setTimeout(initGraph, 500)
    const timer2 = setTimeout(initGraph, 1000)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [data.nodes.length, isClient])

  // Track user node screen position for voice widget overlay
  useEffect(() => {
    if (!graphRef.current || !isClient) return

    const updateUserPosition = () => {
      try {
        if (!graphRef.current) return

        // User node is always at origin (0,0,0)
        const coords = graphRef.current.graph2ScreenCoords(0, 0, 0)

        if (coords && coords.x && coords.y) {
          const newPos = { x: coords.x, y: coords.y }
          setUserNodePosition(newPos)

          // Call callback to update parent
          if (onUserNodePositionChange) {
            onUserNodePositionChange(newPos)
          }
        }
      } catch (e) {
        // Ignore - graph may not be ready
      }
    }

    // Update position frequently for smooth tracking
    const interval = setInterval(updateUserPosition, 50)
    // Also run immediately
    setTimeout(updateUserPosition, 100)
    setTimeout(updateUserPosition, 500)
    setTimeout(updateUserPosition, 1000)

    return () => clearInterval(interval)
  }, [data.nodes, isClient, onUserNodePositionChange])

  // Node appearance with glow effects
  const nodeThreeObject = useCallback((node: any) => {
    const baseColor = NODE_COLORS[node.type] || '#666666'
    const size = NODE_SIZES[node.type] || 10
    const isUser = node.type === 'user'

    // Create main sphere
    const geometry = new THREE.SphereGeometry(size, 32, 32)
    const material = new THREE.MeshPhongMaterial({
      color: baseColor,
      emissive: baseColor,
      emissiveIntensity: isUser ? 0.4 : 0.2,
      shininess: 100,
    })
    const mesh = new THREE.Mesh(geometry, material)

    // Add outer glow
    const glowSize = isUser ? size * 1.5 : size * 1.2
    const glowGeometry = new THREE.SphereGeometry(glowSize, 32, 32)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: baseColor,
      transparent: true,
      opacity: isUser ? 0.3 : 0.15,
    })
    mesh.add(new THREE.Mesh(glowGeometry, glowMaterial))

    // Add pulsing ring for user node (where voice widget will be)
    if (isUser) {
      const ringGeometry = new THREE.RingGeometry(size + 5, size + 8, 64)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: isVoiceActive ? '#22C55E' : '#8B5CF6',
        transparent: true,
        opacity: isVoiceActive ? 0.8 : 0.4,
        side: THREE.DoubleSide,
      })
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.rotation.x = Math.PI / 2
      mesh.add(ring)
    }

    // Add label (except for user - that's the voice widget)
    if (!isUser) {
      const sprite = new SpriteText(node.label)
      sprite.color = '#FFFFFF'
      sprite.textHeight = 5
      sprite.fontWeight = 'bold'
      sprite.position.set(0, size + 10, 0)
      mesh.add(sprite)
    }

    return mesh
  }, [isVoiceActive])

  // Handle node click
  const handleNodeClick = useCallback((node: any) => {
    if (node.type === 'user') {
      // User node clicked - toggle voice
      onVoiceToggle()
      return
    }

    if (node.profileItemId && onNodeClick) {
      const item = items.find(i => i.id === node.profileItemId)
      if (item) {
        onNodeClick(item)
      }
    }
  }, [items, onNodeClick, onVoiceToggle])

  if (!isClient) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative w-full h-full bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-hidden">
      {/* 3D Graph */}
      <ForceGraph3DLib
        ref={graphRef}
        graphData={data}
        nodeThreeObject={nodeThreeObject}
        linkColor={() => 'rgba(139, 92, 246, 0.4)'}
        linkWidth={2}
        linkOpacity={0.6}
        linkDirectionalParticles={3}
        linkDirectionalParticleWidth={3}
        linkDirectionalParticleSpeed={0.008}
        linkDirectionalParticleColor={() => '#8B5CF6'}
        onNodeClick={handleNodeClick}
        backgroundColor="transparent"
        showNavInfo={false}
        enableNavigationControls={true}
        width={dimensions.width}
        height={dimensions.height}
        warmupTicks={100}
        cooldownTime={1000}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
      />

      {/* Note: Voice widget and overlays are handled externally by the parent component */}
    </div>
  )
}
