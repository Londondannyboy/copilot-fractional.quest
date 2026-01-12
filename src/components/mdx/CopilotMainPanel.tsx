"use client";

import { useState, useCallback } from "react";

interface CopilotMainPanelProps {
  title?: string;
  placeholder?: string;
  suggestedQuestions?: string[];
  context?: {
    pageType?: string;
    location?: string;
    role?: string;
  };
}

/**
 * CopilotMainPanel - Embeddable chat-like interface for main content area
 *
 * This component provides suggested questions and an input that integrates
 * with the page's CopilotKit context. Questions trigger the main CopilotSidebar.
 *
 * Usage in MDX:
 * ```mdx
 * <CopilotMainPanel
 *   title="Ask about this market"
 *   suggestedQuestions={[
 *     "What's the average day rate for CMOs?",
 *     "Show me jobs in London"
 *   ]}
 * />
 * ```
 */
export default function CopilotMainPanel({
  title = "Ask me anything",
  placeholder = "Type your question...",
  suggestedQuestions = [
    "What's the average day rate for my target role?",
    "Show me jobs matching my profile",
    "How does my rate compare to market?",
    "What skills are most in demand?",
  ],
  context,
}: CopilotMainPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  // This sends the question to the CopilotKit sidebar via a custom event
  const handleSubmit = useCallback((question: string) => {
    if (!question.trim()) return;

    setSelectedQuestion(question);

    // Dispatch custom event that the parent page can listen to
    // to forward to CopilotKit
    window.dispatchEvent(
      new CustomEvent("copilot-question", {
        detail: {
          question,
          context,
        },
      })
    );

    setInputValue("");

    // Show feedback briefly
    setTimeout(() => setSelectedQuestion(null), 3000);
  }, [context]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation(); // Prevent CopilotKit sidebar from capturing
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(inputValue);
    }
  };

  return (
    <div className="my-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
          <span className="text-xl">🤖</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">Powered by CopilotKit + AI</p>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Quick questions:</div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSubmit(question)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-300 ${
                selectedQuestion === question
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border-gray-200 hover:border-emerald-300"
              }`}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <button
          onClick={() => handleSubmit(inputValue)}
          disabled={!inputValue.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>

      {/* Feedback when question sent */}
      {selectedQuestion && (
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-sm text-emerald-700">
            Question sent to assistant: &ldquo;{selectedQuestion}&rdquo;
          </div>
        </div>
      )}

      {/* Context indicator */}
      {context && (
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
          Context-aware: {context.location && `${context.location}`}
          {context.role && ` / ${context.role}`}
        </div>
      )}
    </div>
  );
}
