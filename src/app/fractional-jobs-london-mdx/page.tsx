"use client";

import { useEffect, useCallback, useState } from "react";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { useCopilotChat } from "@copilotkit/react-core";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { authClient } from "@/lib/auth/client";
import { VoiceInput } from "@/components/voice-input";

// MDX Components (imported directly for this demo)
import PersonalizedHero from "@/components/mdx/PersonalizedHero";
import SalaryBenchmarkChart from "@/components/mdx/SalaryBenchmarkChart";
import CareerTimeline from "@/components/mdx/CareerTimeline";
import MarketOverview from "@/components/mdx/MarketOverview";
import CopilotMainPanel from "@/components/mdx/CopilotMainPanel";
import { EmbeddedJobBoard } from "@/components/EmbeddedJobBoard";
import { RoleCalculator } from "@/components/RoleCalculator";

/**
 * MDX Demo Page - fractional-jobs-london-mdx
 *
 * This page demonstrates the power of MDX + CopilotKit:
 * - Personalized content based on user profile
 * - Interactive components embedded in content flow
 * - CopilotKit integration in main content area
 * - Voice widget integration
 * - Career trajectory visualization
 * - Salary benchmarking
 */
export default function MDXDemoPage() {
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

    window.addEventListener("copilot-question", handleQuestion as EventListener);
    return () => {
      window.removeEventListener("copilot-question", handleQuestion as EventListener);
    };
  }, [handleVoiceMessage]);

  // Build context for CopilotKit
  const pageContext = {
    pageType: "guide" as const,
    pageH1: "Fractional Jobs London - MDX Demo",
    pageUrl: "/fractional-jobs-london-mdx",
    pageDescription: "Interactive MDX demo with personalized content",
  };

  const instructions = `
## MDX Demo Page Context
This is a demo page showcasing MDX + CopilotKit integration.
The user is exploring fractional executive opportunities in London.

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
`;

  return (
    <CopilotSidebar
      instructions={instructions}
      labels={{
        title: "Fractional Quest AI",
        initial: "Hi! This is an MDX-powered page. Ask me about jobs, salaries, or your career path!",
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

      {/* Main Content - MDX Style */}
      <main className="min-h-screen bg-gray-50">
        {/* Personalized Hero */}
        <PersonalizedHero
          location={userProfile.location}
          role={userProfile.targetRole}
          jobCount={47}
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* MDX Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            <span>✨</span>
            <span>MDX-Powered Page Demo</span>
          </div>

          {/* Intro Section - This would be MDX markdown */}
          <section className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to the Future of Content
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This page demonstrates how <strong>MDX</strong> can transform your content experience.
              Every component below is embedded directly in the content flow - mixing prose with
              interactive React components seamlessly.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With MDX + CopilotKit, your AI assistant understands the page context and can
              generate rich responses with embedded components - not just text.
            </p>
          </section>

          {/* Market Overview Component */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              📊 Live Market Data
            </h2>
            <p className="text-gray-600 mb-6">
              The component below shows real-time market statistics. In MDX, you simply write:
              <code className="bg-gray-100 px-2 py-1 rounded mx-2">{`<MarketOverview location="London" role="CMO" />`}</code>
            </p>
            <MarketOverview location={userProfile.location} role={userProfile.targetRole} />
          </section>

          {/* Salary Benchmark */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              💰 Your Salary Benchmark
            </h2>
            <p className="text-gray-600 mb-6">
              See how your rate compares to the {userProfile.location} market for {userProfile.targetRole} roles.
              This chart is personalized based on your profile data.
            </p>
            <SalaryBenchmarkChart
              role={userProfile.targetRole}
              location={userProfile.location}
              yourRate={userProfile.dayRate}
            />
          </section>

          {/* CopilotKit in Main Panel */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              🤖 Ask the AI (In-Content Chat)
            </h2>
            <p className="text-gray-600 mb-6">
              Instead of just a sidebar, CopilotKit can be embedded directly in your content.
              Questions here are forwarded to the same AI assistant - same context, same capabilities.
            </p>
            <CopilotMainPanel
              title="Ask about London opportunities"
              context={{
                pageType: "mdx_demo",
                location: userProfile.location,
                role: userProfile.targetRole,
              }}
              suggestedQuestions={[
                `What's the average day rate for ${userProfile.targetRole}s in ${userProfile.location}?`,
                "Show me available jobs",
                "How can I increase my rate?",
                "What skills are most valuable?",
              ]}
            />
          </section>

          {/* Career Timeline */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              🚀 Your Career Trajectory
            </h2>
            <p className="text-gray-600 mb-6">
              This interactive timeline visualizes your potential career path from your current
              position to becoming a successful portfolio fractional executive.
            </p>
            <CareerTimeline
              currentRole="Marketing Director"
              targetRole={`Fractional ${userProfile.targetRole}`}
              userName={firstName || undefined}
            />
          </section>

          {/* Job Board */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              💼 Available Opportunities
            </h2>
            <p className="text-gray-600 mb-6">
              Browse and filter jobs directly within the content. This is the same EmbeddedJobBoard
              component, now seamlessly integrated into the MDX flow.
            </p>
            <EmbeddedJobBoard
              defaultDepartment="Marketing"
              title={`${userProfile.targetRole} Jobs in ${userProfile.location}`}
              accentColor="emerald"
              jobsPerPage={6}
            />
          </section>

          {/* Calculator */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              🧮 Earnings Calculator
            </h2>
            <p className="text-gray-600 mb-6">
              Calculate your potential earnings as a fractional executive. Adjust the sliders
              to see how different scenarios affect your income.
            </p>
            <RoleCalculator role={userProfile.targetRole} />
          </section>

          {/* Benefits Section */}
          <section className="mb-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              ✨ Why MDX Matters
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="font-semibold text-gray-900 mb-2">Content + Code</h3>
                <p className="text-gray-600 text-sm">
                  Write content as Markdown, embed React components inline. No more separate templates.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="font-semibold text-gray-900 mb-2">AI-Friendly</h3>
                <p className="text-gray-600 text-sm">
                  MDX is readable by AI. CopilotKit can generate MDX responses with embedded components.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">👤</div>
                <h3 className="font-semibold text-gray-900 mb-2">Personalization</h3>
                <p className="text-gray-600 text-sm">
                  Components can access user data and render personalized content dynamically.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Note */}
          <section className="mb-12 border border-gray-200 rounded-xl p-6 bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>💡</span> Technical Implementation
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              This demo uses <code className="bg-gray-100 px-1.5 py-0.5 rounded">next-mdx-remote</code> for
              runtime MDX compilation. In production, you can:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
              <li>Store MDX content in Neon PostgreSQL</li>
              <li>Have CopilotKit generate MDX responses with components</li>
              <li>Create personalized landing pages on the fly</li>
              <li>Build interactive documentation</li>
            </ul>
          </section>
        </div>
      </main>
    </CopilotSidebar>
  );
}
