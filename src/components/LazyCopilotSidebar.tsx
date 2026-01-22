'use client';

import { useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Lazy load the entire CopilotKit bundle - only loads when user opens chat
const CopilotProvider = dynamic(
  () => import('@/components/CopilotProvider').then(mod => ({ default: mod.CopilotProvider })),
  { ssr: false }
);

const CopilotSidebarContent = dynamic(
  () => import('@copilotkit/react-ui').then(mod => ({ default: mod.CopilotSidebar })),
  { ssr: false }
);

interface LazyCopilotSidebarProps {
  children: React.ReactNode;
  instructions?: string;
  labels?: {
    title?: string;
    initial?: string;
  };
}

// Loading state for when CopilotKit is being loaded
function ChatLoadingState() {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl p-6 w-80">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <span className="text-gray-600">Loading AI Chat...</span>
      </div>
    </div>
  );
}

// Chat trigger button shown before CopilotKit loads
function ChatTriggerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-105 group"
      aria-label="Open AI Chat"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with AI
      </span>
    </button>
  );
}

/**
 * LazyCopilotSidebar - Lazy-loads CopilotKit only when user clicks to chat
 *
 * This dramatically improves initial page load by deferring the ~1MB CopilotKit
 * bundle until the user actually wants to use the AI chat feature.
 */
export function LazyCopilotSidebar({
  children,
  instructions,
  labels
}: LazyCopilotSidebarProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenChat = useCallback(() => {
    setIsLoading(true);
    // Small delay to show loading state
    setTimeout(() => {
      setIsLoaded(true);
      setIsLoading(false);
    }, 100);
  }, []);

  // Before user clicks, just show the page content + trigger button
  if (!isLoaded && !isLoading) {
    return (
      <>
        {children}
        <ChatTriggerButton onClick={handleOpenChat} />
      </>
    );
  }

  // While loading
  if (isLoading) {
    return (
      <>
        {children}
        <ChatLoadingState />
      </>
    );
  }

  // After loaded, render full CopilotKit
  return (
    <CopilotProvider>
      <Suspense fallback={<ChatLoadingState />}>
        <CopilotSidebarContent
          instructions={instructions}
          labels={labels}
        >
          {children}
        </CopilotSidebarContent>
      </Suspense>
    </CopilotProvider>
  );
}
