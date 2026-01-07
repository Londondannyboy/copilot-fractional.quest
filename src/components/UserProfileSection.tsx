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

interface ProfileItem {
  id?: number;
  item_type: string;
  value: string;
  metadata?: { job_title?: string; company_url?: string };
  confirmed: boolean;
  created_at?: string;
}

interface GraphNode {
  id: string;
  name: string;
  type: "user" | "location" | "role" | "company" | "skill";
  val: number;
}

interface GraphLink {
  source: string;
  target: string;
}

interface UserProfileSectionProps {
  userId?: string;
  userName?: string;
  refreshTrigger?: number;
  onProfileUpdate?: () => void;
}

type ViewMode = "list" | "graph";

// Valid options - these are common/suggested options
// The actual validation happens on the backend which can accept more
const SUGGESTED_ROLES = [
  "CEO", "CFO", "CMO", "CTO", "COO", "CHRO", "CIO", "CISO", "CPO", "CRO", "CCO", "CSO",
  "VP Engineering", "VP Sales", "VP Marketing", "VP Operations", "VP Product",
  "Director", "Managing Director", "General Manager",
  "Board Member", "Non-Executive Director", "Advisor"
];

const SUGGESTED_LOCATIONS = [
  // UK Cities
  "London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool",
  "Edinburgh", "Bristol", "Sheffield", "Newcastle", "Nottingham", "Cardiff",
  "Belfast", "Leicester", "Southampton", "Brighton", "Oxford", "Cambridge",
  // Work arrangements
  "Remote", "Hybrid", "Hybrid - London", "Hybrid - Manchester",
  // International
  "New York", "San Francisco", "Berlin", "Dublin", "Amsterdam", "Paris",
  // Custom option
  "Other..."
];

// Section config
const SECTIONS = [
  {
    key: "location",
    label: "Location",
    icon: "📍",
    placeholder: "Select location...",
    color: "emerald",
    single: true, // Only one allowed
    options: SUGGESTED_LOCATIONS, // Suggested dropdown with Other option
  },
  {
    key: "role_preference",
    label: "Target Role",
    icon: "🎯",
    placeholder: "Select role...",
    color: "blue",
    single: true,
    options: SUGGESTED_ROLES, // Suggested dropdown
  },
  {
    key: "company",
    label: "Companies",
    icon: "🏢",
    placeholder: "e.g., Google, Microsoft",
    color: "orange",
    single: false,
    options: null, // Free text
  },
  {
    key: "skill",
    label: "Skills",
    icon: "⚡",
    placeholder: "e.g., Leadership, Strategy, Python",
    color: "purple",
    single: false,
    options: null, // Free text
  },
] as const;

const COLOR_CLASSES: Record<string, { bg: string; border: string; text: string; hover: string }> = {
  emerald: {
    bg: "bg-emerald-500/20",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    hover: "hover:bg-emerald-500/30",
  },
  blue: {
    bg: "bg-blue-500/20",
    border: "border-blue-500/30",
    text: "text-blue-400",
    hover: "hover:bg-blue-500/30",
  },
  orange: {
    bg: "bg-orange-500/20",
    border: "border-orange-500/30",
    text: "text-orange-400",
    hover: "hover:bg-orange-500/30",
  },
  purple: {
    bg: "bg-purple-500/20",
    border: "border-purple-500/30",
    text: "text-purple-400",
    hover: "hover:bg-purple-500/30",
  },
};

export function UserProfileSection({
  userId,
  userName,
  refreshTrigger,
  onProfileUpdate,
}: UserProfileSectionProps) {
  const [profileItems, setProfileItems] = useState<ProfileItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newValue, setNewValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Build graph data for 3D visualization
  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [
      { id: "user", name: userName || "You", type: "user", val: 25 },
    ];
    const links: GraphLink[] = [];

    profileItems.forEach((item, i) => {
      const nodeId = `item_${i}`;
      let nodeType: GraphNode["type"] = "skill";
      if (item.item_type === "location") nodeType = "location";
      else if (item.item_type === "role_preference" || item.item_type === "role") nodeType = "role";
      else if (item.item_type === "company") nodeType = "company";

      nodes.push({
        id: nodeId,
        name: item.value,
        type: nodeType,
        val: item.confirmed ? 18 : 14,
      });
      links.push({ source: "user", target: nodeId });
    });

    return { nodes, links };
  }, [profileItems, userName]);

  const getNodeColor = useCallback((node: GraphNode) => {
    const colors: Record<string, string> = {
      user: "#FFD700",
      location: "#10B981",
      role: "#3B82F6",
      company: "#F97316",
      skill: "#A855F7",
    };
    return colors[node.type] || "#6B7280";
  }, []);

  // Fetch profile data
  const fetchData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/user-profile?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.items && Array.isArray(data.items)) {
          setProfileItems(data.items);
        }
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
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
      setJustUpdated(true);
      setTimeout(() => setJustUpdated(false), 2000);
    }
  }, [refreshTrigger, fetchData]);

  // Auto-refresh every 5 seconds for live updates
  useEffect(() => {
    if (!userId) return;
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [userId, fetchData]);

  // Add new item
  const handleAdd = async (itemType: string) => {
    if (!userId || !newValue.trim()) return;

    const section = SECTIONS.find(s => s.key === itemType);

    // For single-value fields, check if one already exists
    if (section?.single) {
      const existing = profileItems.find(p => p.item_type === itemType);
      if (existing) {
        // Delete old one first
        await handleDelete(existing.id!);
      }
    }

    try {
      await fetch("/api/user-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          itemType,
          value: newValue.trim(),
          confirmed: true,
        }),
      });
      setNewValue("");
      setAddingTo(null);
      fetchData();
      onProfileUpdate?.();
    } catch (e) {
      console.error("Failed to add:", e);
    }
  };

  // Delete item
  const handleDelete = async (itemId: number) => {
    if (!userId) return;

    setProfileItems((prev) => prev.filter((p) => p.id !== itemId));

    try {
      await fetch(`/api/user-profile?userId=${userId}&itemId=${itemId}`, {
        method: "DELETE",
      });
      onProfileUpdate?.();
    } catch (e) {
      console.error("Failed to delete:", e);
      fetchData();
    }
  };

  // Save edit
  const handleSaveEdit = async (item: ProfileItem) => {
    if (!userId || !item.id || !editValue.trim()) return;

    try {
      // Delete old, add new (to preserve normalization)
      await handleDelete(item.id);
      await fetch("/api/user-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          itemType: item.item_type,
          value: editValue.trim(),
          confirmed: true,
          metadata: item.metadata,
        }),
      });
      setEditingId(null);
      setEditValue("");
      fetchData();
      onProfileUpdate?.();
    } catch (e) {
      console.error("Failed to save:", e);
    }
  };

  // Group items by type
  const getItemsByType = (type: string) =>
    profileItems.filter((item) => item.item_type === type);

  if (!userId) {
    return (
      <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 text-center border border-white/10">
        <p className="text-white/60">Sign in to manage your profile</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border shadow-xl transition-all duration-500 ${
        justUpdated
          ? "border-green-400/50 shadow-green-400/20 shadow-lg"
          : "border-white/10"
      }`}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
            {userName?.charAt(0) || "?"}
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">
              {userName || "Your Profile"}
            </h2>
            <p className="text-white/50 text-xs">
              {profileItems.length} items saved
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-white/10 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white/20 text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("graph")}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                viewMode === "graph"
                  ? "bg-white/20 text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              3D Graph
            </button>
          </div>
          {isLoading && (
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          )}
          {justUpdated && !isLoading && (
            <span className="text-green-400 text-sm animate-pulse">
              Updated!
            </span>
          )}
        </div>
      </div>

      {/* Graph View */}
      {viewMode === "graph" && (
        <div className="p-4">
          <div className="h-[300px] bg-black/20 rounded-lg overflow-hidden">
            {profileItems.length > 0 ? (
              <ForceGraph3D
                graphData={graphData}
                backgroundColor="rgba(0,0,0,0)"
                nodeColor={(node: unknown) => getNodeColor(node as GraphNode)}
                nodeLabel={(node: unknown) => (node as GraphNode).name}
                nodeVal={(node: unknown) => (node as GraphNode).val}
                linkColor={() => "rgba(255,255,255,0.2)"}
                linkWidth={1.5}
                enableNodeDrag={false}
                enableNavigationControls={true}
                showNavInfo={false}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-white/40 text-sm">Add profile items to see your graph</p>
              </div>
            )}
          </div>
          {/* Legend */}
          <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-white/60">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-yellow-500" /> You
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-emerald-500" /> Location
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-blue-500" /> Role
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-orange-500" /> Company
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-purple-500" /> Skill
            </span>
          </div>
        </div>
      )}

      {/* List View - Profile Sections */}
      {viewMode === "list" && (
      <div className="p-4 space-y-4">
        {SECTIONS.map((section) => {
          const items = getItemsByType(section.key);
          const colors = COLOR_CLASSES[section.color];

          return (
            <div key={section.key} className="space-y-2">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{section.icon}</span>
                  <span className="text-white/70 text-sm font-medium">
                    {section.label}
                  </span>
                  {section.single && (
                    <span className="text-white/30 text-xs">(one only)</span>
                  )}
                </div>
                {/* Add button */}
                {(!section.single || items.length === 0) && addingTo !== section.key && (
                  <button
                    onClick={() => {
                      setAddingTo(section.key);
                      setNewValue("");
                    }}
                    className={`text-xs px-2 py-1 rounded ${colors.bg} ${colors.text} ${colors.hover} transition-colors`}
                  >
                    + Add
                  </button>
                )}
              </div>

              {/* Items */}
              <div className="flex flex-wrap gap-2">
                {items.length === 0 && addingTo !== section.key && (
                  <span className="text-white/30 text-sm italic">
                    Not set yet
                  </span>
                )}

                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} ${colors.border} border transition-all`}
                  >
                    {editingId === item.id ? (
                      <>
                        {section.options ? (
                          // Dropdown for validated fields
                          <select
                            value={editValue}
                            onChange={(e) => {
                              setEditValue(e.target.value);
                              if (e.target.value) {
                                setTimeout(() => handleSaveEdit(item), 100);
                              }
                            }}
                            onKeyDown={(e) => e.stopPropagation()}
                            className="bg-transparent text-white text-sm outline-none w-32 cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white"
                            autoFocus
                          >
                            <option value="">Select...</option>
                            {section.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          // Free text input
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              e.stopPropagation();
                              if (e.key === "Enter") handleSaveEdit(item);
                              if (e.key === "Escape") {
                                setEditingId(null);
                                setEditValue("");
                              }
                            }}
                            className="bg-transparent text-white text-sm outline-none w-24"
                            autoFocus
                          />
                        )}
                        {!section.options && (
                          <button
                            onClick={() => handleSaveEdit(item)}
                            className="text-green-400 text-xs hover:text-green-300"
                          >
                            ✓
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditValue("");
                          }}
                          className="text-red-400 text-xs hover:text-red-300"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <>
                        <span className={`text-sm ${colors.text}`}>
                          {item.value}
                          {item.item_type === "company" &&
                            item.metadata?.job_title && (
                              <span className="text-white/40 ml-1">
                                ({item.metadata.job_title})
                              </span>
                            )}
                        </span>
                        {item.confirmed && (
                          <span className="text-green-400 text-xs">✓</span>
                        )}
                        {/* Edit/Delete on hover */}
                        <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                          <button
                            onClick={() => {
                              setEditingId(item.id || null);
                              setEditValue(item.value);
                            }}
                            className="text-white/40 hover:text-white text-xs"
                            title="Edit"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => item.id && handleDelete(item.id)}
                            className="text-white/40 hover:text-red-400 text-xs"
                            title="Delete"
                          >
                            ✕
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}

                {/* Add new input - dropdown for validated fields, text for free text */}
                {addingTo === section.key && (
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} ${colors.border} border`}
                  >
                    {section.options ? (
                      // Dropdown for validated fields (location, role)
                      <select
                        value={newValue}
                        onChange={(e) => {
                          setNewValue(e.target.value);
                          if (e.target.value) {
                            // Auto-save on selection for dropdowns
                            setTimeout(() => {
                              handleAdd(section.key);
                            }, 100);
                          }
                        }}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="bg-transparent text-white text-sm outline-none w-44 cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white"
                        autoFocus
                      >
                        <option value="" className="text-gray-400">{section.placeholder}</option>
                        {section.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      // Free text input for other fields
                      <input
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          if (e.key === "Enter" && newValue.trim()) {
                            handleAdd(section.key);
                          }
                          if (e.key === "Escape") {
                            setAddingTo(null);
                            setNewValue("");
                          }
                        }}
                        placeholder={section.placeholder}
                        className="bg-transparent text-white text-sm outline-none placeholder-white/30 w-40"
                        autoFocus
                      />
                    )}
                    {!section.options && (
                      <button
                        onClick={() => handleAdd(section.key)}
                        disabled={!newValue.trim()}
                        className="text-green-400 text-xs hover:text-green-300 disabled:text-white/20"
                      >
                        ✓
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setAddingTo(null);
                        setNewValue("");
                      }}
                      className="text-red-400 text-xs hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      )}

      {/* Footer hint */}
      <div className="px-5 py-3 border-t border-white/10 text-white/40 text-xs">
        Talk to the AI to add more items automatically
      </div>
    </div>
  );
}
