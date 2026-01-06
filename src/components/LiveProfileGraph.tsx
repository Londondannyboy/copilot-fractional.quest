"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";

// Dynamic import for 3D graph (SSR issues)
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-lg">
      <span className="text-white/60 text-xs">Loading graph...</span>
    </div>
  ),
});

interface ZepFact {
  fact: string;
  name?: string;
}

interface Entity {
  name: string;
  type: "location" | "role" | "company" | "skill" | "industry";
}

interface GraphNode {
  id: string;
  name: string;
  type: "user" | "location" | "role" | "company" | "skill" | "industry";
  val: number;
}

interface GraphLink {
  source: string;
  target: string;
}

interface LiveProfileGraphProps {
  userId?: string;
  userName?: string;
  refreshTrigger?: number;
}

// Entity extraction patterns
const LOCATIONS = ["london", "manchester", "birmingham", "leeds", "bristol", "edinburgh", "glasgow", "remote", "uk", "europe", "usa", "new york", "san francisco"];
const ROLES = ["cto", "cfo", "cmo", "coo", "cpo", "chro", "ciso", "ceo", "vp", "director", "head of", "chief", "executive", "founder", "partner"];
const INDUSTRIES = ["tech", "fintech", "saas", "ai", "finance", "healthcare", "retail", "ecommerce", "media", "consulting", "startup", "enterprise"];
const SKILLS = ["python", "javascript", "react", "node", "aws", "cloud", "data", "analytics", "strategy", "leadership", "product", "marketing", "sales", "growth"];

function extractEntities(facts: ZepFact[]): Entity[] {
  const entities: Map<string, Entity> = new Map();

  facts.forEach(fact => {
    const text = fact.fact.toLowerCase();

    // Extract locations
    LOCATIONS.forEach(loc => {
      if (text.includes(loc)) {
        const name = loc.charAt(0).toUpperCase() + loc.slice(1);
        entities.set(name.toLowerCase(), { name, type: "location" });
      }
    });

    // Extract roles
    ROLES.forEach(role => {
      if (text.includes(role)) {
        // Get proper formatting for role
        let name = role.toUpperCase();
        if (role === "head of" || role === "director" || role === "partner" || role === "founder" || role === "executive") {
          name = role.charAt(0).toUpperCase() + role.slice(1);
        }
        entities.set(role, { name, type: "role" });
      }
    });

    // Extract industries
    INDUSTRIES.forEach(ind => {
      if (text.includes(ind)) {
        const name = ind.charAt(0).toUpperCase() + ind.slice(1);
        entities.set(ind, { name, type: "industry" });
      }
    });

    // Extract skills
    SKILLS.forEach(skill => {
      if (text.includes(skill)) {
        const name = skill.charAt(0).toUpperCase() + skill.slice(1);
        entities.set(skill, { name, type: "skill" });
      }
    });

    // Extract company names (capitalized words that aren't common words)
    const companyPattern = /\b(at|for|with|from)\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)\b/g;
    let match;
    while ((match = companyPattern.exec(fact.fact)) !== null) {
      const company = match[2];
      if (company.length > 2 && !["The", "This", "That", "User", "They", "Their"].includes(company)) {
        entities.set(company.toLowerCase(), { name: company, type: "company" });
      }
    }
  });

  return Array.from(entities.values());
}

interface ProfileItem {
  item_type: string;
  value: string;
  metadata?: { job_title?: string; company_url?: string };
  confirmed: boolean;
}

export function LiveProfileGraph({ userId, userName, refreshTrigger }: LiveProfileGraphProps) {
  const [facts, setFacts] = useState<ZepFact[]>([]);
  const [profileItems, setProfileItems] = useState<ProfileItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      // Fetch from both sources in parallel
      const [zepRes, neonRes] = await Promise.all([
        fetch(`/api/zep-context?userId=${userId}`).catch(() => null),
        fetch(`/api/user-profile?userId=${userId}`).catch(() => null),
      ]);

      // Process Zep facts
      if (zepRes?.ok) {
        const zepData = await zepRes.json();
        if (zepData.facts && Array.isArray(zepData.facts)) {
          setFacts(zepData.facts);
        }
      }

      // Process Neon profile items (confirmed data takes priority)
      if (neonRes?.ok) {
        const neonData = await neonRes.json();
        if (neonData.items && Array.isArray(neonData.items)) {
          setProfileItems(neonData.items);
          console.log("📊 Profile items from Neon:", neonData.items.length);
        }
      }
    } catch (err) {
      console.error("Failed to fetch profile data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Fetch on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refresh when trigger changes
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      fetchData();
    }
  }, [refreshTrigger, fetchData]);

  // Auto-refresh every 15 seconds
  useEffect(() => {
    if (!userId) return;
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [userId, fetchData]);

  // Extract entities and build graph from both sources
  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [
      { id: "user", name: userName || "You", type: "user", val: 25 },
    ];
    const links: GraphLink[] = [];
    const seenLabels = new Set<string>();

    // First, add confirmed Neon profile items (they take priority)
    profileItems.forEach((item, i) => {
      const label = item.item_type === "company" && item.metadata?.job_title
        ? `${item.value} (${item.metadata.job_title})`
        : item.value;

      if (seenLabels.has(label.toLowerCase())) return;
      seenLabels.add(label.toLowerCase());

      const nodeId = `neon_${i}`;
      // Map item_type to graph node type
      let nodeType: GraphNode["type"] = "skill";
      if (item.item_type === "location") nodeType = "location";
      else if (item.item_type === "role_preference" || item.item_type === "role") nodeType = "role";
      else if (item.item_type === "company") nodeType = "company";
      else if (item.item_type === "industry") nodeType = "industry";

      nodes.push({
        id: nodeId,
        name: label,
        type: nodeType,
        val: item.confirmed ? 20 : 15, // Confirmed items are larger
      });
      links.push({ source: "user", target: nodeId });
    });

    // Then add Zep-extracted entities (if not already present)
    const zepEntities = extractEntities(facts);
    zepEntities.forEach((entity, i) => {
      if (seenLabels.has(entity.name.toLowerCase())) return;
      seenLabels.add(entity.name.toLowerCase());

      const nodeId = `zep_${i}`;
      nodes.push({
        id: nodeId,
        name: entity.name,
        type: entity.type,
        val: entity.type === "role" ? 16 : entity.type === "location" ? 14 : 12,
      });
      links.push({ source: "user", target: nodeId });
    });

    return { nodes, links };
  }, [facts, profileItems, userName]);

  // Color mapping
  const getNodeColor = useCallback((node: GraphNode) => {
    const colors: Record<string, string> = {
      user: "#FFD700",      // Gold
      location: "#22C55E",  // Green
      role: "#3B82F6",      // Blue
      company: "#F97316",   // Orange
      skill: "#A855F7",     // Purple
      industry: "#EC4899",  // Pink
    };
    return colors[node.type] || "#6B7280";
  }, []);

  if (!userId) {
    return (
      <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 text-center border border-white/10">
        <p className="text-white/60 text-sm">Sign in to see your profile</p>
      </div>
    );
  }

  const entityCount = graphData.nodes.length - 1; // Exclude user node

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-xl">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">Your Profile</span>
          {isLoading && (
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          )}
        </div>
        <span className="text-white/50 text-xs">
          {entityCount} {entityCount === 1 ? 'entity' : 'entities'}
        </span>
      </div>

      {/* Graph */}
      <div className="w-[380px] h-[280px]">
        {entityCount > 0 ? (
          <ForceGraph3D
            graphData={graphData}
            width={380}
            height={280}
            backgroundColor="rgba(0,0,0,0)"
            nodeColor={(node: unknown) => getNodeColor(node as GraphNode)}
            nodeLabel={(node: unknown) => (node as GraphNode).name}
            nodeVal={(node: unknown) => (node as GraphNode).val}
            linkColor={() => "rgba(255,255,255,0.15)"}
            linkWidth={1.5}
            enableNodeDrag={false}
            enableNavigationControls={false}
            showNavInfo={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-white/40 text-sm text-center px-6">
              Chat to build your profile
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="px-4 py-2 border-t border-white/10 flex flex-wrap gap-3 text-white/70">
        <span className="text-xs flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Location
        </span>
        <span className="text-xs flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Role
        </span>
        <span className="text-xs flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Company
        </span>
      </div>
    </div>
  );
}
