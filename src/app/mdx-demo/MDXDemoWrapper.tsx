"use client";

import { useCallback, useEffect, useState } from "react";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { useCopilotChat } from "@copilotkit/react-core";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { authClient } from "@/lib/auth/client";
import { VoiceInput } from "@/components/voice-input";

/**
 * MDX Demo Wrapper - Provides CopilotKit context for MDX content
 *
 * This wrapper:
 * - Wraps MDX content with CopilotSidebar
 * - Provides voice input integration
 * - Passes user context to the AI agent
 * - Listens for events from CopilotMainPanel
 */
export function MDXDemoWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] || null;

  const { appendMessage } = useCopilotChat();

  // User profile state (would come from database in production)
  const [userProfile] = useState({
    location: "London",
    targetRole: "CMO",
    experience: "Senior",
    dayRate: 1100,
  });

  // Handle voice messages
  const handleVoiceMessage = useCallback(
    (text: string, role: "user" | "assistant" = "user") => {
      if (!text.trim()) return;
      const message = new TextMessage({
        content: text,
        role: role === "user" ? Role.User : Role.Assistant,
      });
      appendMessage(message);
    },
    [appendMessage]
  );

  // Listen for questions from CopilotMainPanel
  useEffect(() => {
    const handleQuestion = (event: CustomEvent) => {
      const { question } = event.detail;
      if (question) {
        handleVoiceMessage(question, "user");
      }
    };

    window.addEventListener(
      "copilot-question",
      handleQuestion as EventListener
    );
    return () => {
      window.removeEventListener(
        "copilot-question",
        handleQuestion as EventListener
      );
    };
  }, [handleVoiceMessage]);

  // Build context for CopilotKit
  const pageContext = {
    pageType: "guide" as const,
    pageH1: "MDX Demo - Interactive Content",
    pageUrl: "/mdx-demo",
    pageDescription: "Interactive MDX demo with embedded React components",
  };

  const instructions = `
## MDX Demo Page Context
This is a demonstration of MDX-powered pages with embedded React components.
The user is exploring fractional executive opportunities.

User Profile:
- Name: ${firstName || "Guest"}
- Location: ${userProfile.location}
- Target Role: ${userProfile.targetRole}
- Current Day Rate: £${userProfile.dayRate}

When the user asks questions:
- Reference their profile data
- Suggest personalized job matches
- Provide salary benchmarking insights
- Help with career trajectory planning

This page demonstrates:
- PersonalizedHero component for user-aware hero sections
- SalaryBenchmarkChart for role-based salary visualization
- CareerTimeline for career progression
- MarketOverview for market statistics
- CopilotMainPanel for embedded chat
- EmbeddedJobBoard for job listings
- RoleCalculator for earnings calculation
`;

  return (
    <CopilotSidebar
      instructions={instructions}
      labels={{
        title: "Fractional Quest AI",
        initial:
          "Welcome to the MDX demo! This page shows how MDX combines content with interactive React components. Ask me about jobs, salaries, or your career path!",
      }}
      className="h-full"
    >
      {/* Voice Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <VoiceInput
          onMessage={handleVoiceMessage}
          firstName={firstName}
          userId={user?.id || null}
          pageContext={pageContext}
        />
      </div>

      {/* MDX Content */}
      <main className="min-h-screen bg-gray-50">{children}</main>
    </CopilotSidebar>
  );
}
