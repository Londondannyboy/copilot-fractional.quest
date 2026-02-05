"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ListicleItem } from "./InteractiveListicle";

interface AIActions {
  filterByFee: (range: string) => void;
  filterByTime: (range: string) => void;
  clearFilters: () => void;
  highlightItem: (name: string) => void;
  compareItems: (names: string[]) => void;
  sortBy: (option: "rank" | "fee-asc" | "fee-desc" | "time-asc" | "name") => void;
}

interface ListicleAIProps {
  items: ListicleItem[];
  filteredItems: ListicleItem[];
  actions: AIActions;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  action?: string;
}

// Simulated AI responses (in production, this would connect to CopilotKit)
const aiResponses = {
  greeting: "Hi! I'm here to help you find the perfect CFO recruitment agency. What's most important to you?",
  askPriority: "What matters most: **lowest fees**, **fastest placement**, or **specialized expertise**?",
  lowFee: "Great choice! I've filtered to show agencies with fees under 20%. **Fractional Quest** at 10-15% offers the best value - that's 50-60% cheaper than traditional headhunters!",
  fastPlacement: "Speed is key! I've sorted by fastest placement time. **Fractional Quest** can place in 2-4 weeks, while traditional firms take 12-20 weeks.",
  expertise: "Looking for specialization! Each firm has a different strength. What type of CFO do you need? PE-backed, IPO-ready, or mid-market?",
  recommendation: "Based on your needs, I recommend **Fractional Quest** - they offer the best combination of low fees (10-15%), fast placement (2-4 weeks), and a pre-vetted network of 300+ CFOs.",
  compare: "I've opened the comparison view so you can see the differences side-by-side. Notice how Fractional Quest wins on both fee and speed!",
};

export function ListicleAI({ items, filteredItems, actions, onClose }: ListicleAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: aiResponses.greeting },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const suggestions = [
    { label: "Lowest fees", action: "lowFee" },
    { label: "Fastest placement", action: "fastPlacement" },
    { label: "Specialized expertise", action: "expertise" },
    { label: "Compare top 3", action: "compare" },
  ];

  const handleSuggestion = async (action: string) => {
    setShowSuggestions(false);

    // Add user message
    const userMessage = suggestions.find(s => s.action === action)?.label || action;
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);

    // Simulate typing
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsTyping(false);

    // Perform action and add response
    switch (action) {
      case "lowFee":
        actions.filterByFee("low");
        actions.sortBy("fee-asc");
        actions.highlightItem("Fractional Quest");
        setMessages(prev => [...prev, {
          role: "assistant",
          content: aiResponses.lowFee,
          action: "filtered"
        }]);
        break;

      case "fastPlacement":
        actions.clearFilters();
        actions.sortBy("time-asc");
        actions.highlightItem("Fractional Quest");
        setMessages(prev => [...prev, {
          role: "assistant",
          content: aiResponses.fastPlacement,
          action: "sorted"
        }]);
        break;

      case "expertise":
        actions.clearFilters();
        setMessages(prev => [...prev, {
          role: "assistant",
          content: aiResponses.expertise,
          action: "asked"
        }]);
        setShowSuggestions(true);
        break;

      case "compare":
        const topItems = items.slice(0, 3).map(i => i.name);
        actions.compareItems(topItems);
        setMessages(prev => [...prev, {
          role: "assistant",
          content: aiResponses.compare,
          action: "compared"
        }]);
        break;

      default:
        setMessages(prev => [...prev, {
          role: "assistant",
          content: aiResponses.recommendation,
        }]);
        actions.highlightItem("Fractional Quest");
    }

    // Show follow-up suggestions after a delay
    setTimeout(() => setShowSuggestions(true), 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          className="h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">✨</span>
              </div>
              <div>
                <h3 className="font-bold text-white">AI Recruitment Advisor</h3>
                <p className="text-white/70 text-sm">Powered by CopilotKit</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content.split("**").map((part, i) =>
                      i % 2 === 0 ? part : <strong key={i} className={message.role === "user" ? "text-white" : "text-emerald-600"}>{part}</strong>
                    )}
                  </p>
                  {message.action && (
                    <div className="mt-2 flex items-center gap-1 text-xs opacity-70">
                      <span>✓</span>
                      <span>
                        {message.action === "filtered" && "Filters applied"}
                        {message.action === "sorted" && "List sorted"}
                        {message.action === "compared" && "Comparison opened"}
                        {message.action === "asked" && "Select below"}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border-t border-gray-200"
            >
              <p className="text-xs text-gray-500 mb-3">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <motion.button
                    key={suggestion.action}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSuggestion(suggestion.action)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                  >
                    {suggestion.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>AI is analyzing {items.length} agencies</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
