"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Only load CopilotKit when user actually clicks to enable it
const CopilotKitWrapper = dynamic(
  () => import("./CopilotKitWrapper"),
  { ssr: false }
);

interface LazyAIChatProps {
  children: React.ReactNode;
  instructions?: string;
  title?: string;
  initialMessage?: string;
  accentColor?: string;
}

/**
 * LazyAIChat - Wraps content and only loads CopilotKit when user enables it
 * This saves ~687KB of JS from initial page load
 */
export function LazyAIChat({
  children,
  instructions,
  title,
  initialMessage,
  accentColor,
}: LazyAIChatProps) {
  const [aiEnabled, setAiEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const enableAI = useCallback(() => {
    setIsLoading(true);
    setAiEnabled(true);
  }, []);

  // If AI is enabled, render with CopilotKit
  if (aiEnabled) {
    return (
      <CopilotKitWrapper
        instructions={instructions}
        title={title}
        initialMessage={initialMessage}
        accentColor={accentColor}
        onLoad={() => setIsLoading(false)}
      >
        {children}
      </CopilotKitWrapper>
    );
  }

  // Otherwise, just render content with an "Enable AI" button
  return (
    <>
      {children}

      {/* Floating AI button - only shows when AI is not enabled */}
      <button
        onClick={enableAI}
        disabled={isLoading}
        className="fixed bottom-6 right-6 z-50 bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
        aria-label="Enable AI Chat Assistant"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="font-medium">Loading AI...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="font-medium">Chat with AI</span>
          </>
        )}
      </button>
    </>
  );
}

export default LazyAIChat;
