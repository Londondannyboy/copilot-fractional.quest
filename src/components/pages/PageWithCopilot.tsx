"use client";

import { useCallback, ReactNode } from "react";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { useCopilotChat } from "@copilotkit/react-core";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { CopilotProvider } from "@/components/CopilotProvider";
import { PageRenderer } from "./PageRenderer";
import { VoiceInput } from "@/components/voice-input";
import { authClient } from "@/lib/auth/client";
import type { PageData } from "@/lib/pages";

// Structured page with full PageData
interface PageWithCopilotPropsWithPage {
  page: PageData;
  children?: never;
  pageContext?: never;
  initialContent?: never;
}

// MDX/custom content with context string
interface PageWithCopilotPropsWithChildren {
  page?: never;
  children: ReactNode;
  pageContext: string; // e.g., "Fractional CFO Jobs - United States"
  initialContent?: string; // Optional content for voice context
}

type PageWithCopilotProps = PageWithCopilotPropsWithPage | PageWithCopilotPropsWithChildren;

// Outer component that provides CopilotKit context
export function PageWithCopilot(props: PageWithCopilotProps) {
  return (
    <CopilotProvider>
      <PageWithCopilotInner {...props} />
    </CopilotProvider>
  );
}

// Inner component with CopilotKit hooks
function PageWithCopilotInner(props: PageWithCopilotProps) {
  // Get user from Neon Auth
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] || null;

  const { appendMessage } = useCopilotChat();

  // Handle voice messages - forward to CopilotKit
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

  // Check if we're rendering a structured page or custom children
  const isStructuredPage = 'page' in props && props.page;
  const page = isStructuredPage ? props.page : null;

  // Build context-aware instructions based on page type or context string
  const getInstructions = () => {
    if (page) {
      const baseContext = `You are on the "${page.hero_title || page.title}" page on Fractional Quest.`;

      switch (page.page_type) {
        case 'definition':
          return `${baseContext} This is a definition/meaning page explaining what a fractional executive role means. Help users understand the concept and guide them to relevant job listings or hiring information.`;
        case 'pricing':
          return `${baseContext} This page covers costs and pricing for fractional executives. Help users understand day rates, monthly costs, and factors affecting pricing. Guide them to relevant services or job pages.`;
        case 'comparison':
          return `${baseContext} This is a comparison page helping users choose between options (fractional vs full-time, vs agency, etc.). Help them make the right decision for their situation.`;
        case 'career_guide':
          return `${baseContext} This page helps people become fractional executives. Guide them on career transition, building a portfolio career, and finding opportunities.`;
        case 'industry':
          return `${baseContext} This page covers fractional executives for a specific industry or company type. Help users understand how fractional leadership works in this context.`;
        case 'static':
          return `${baseContext} Help users with any questions about Fractional Quest or fractional executives in general.`;
        case 'legal':
          return `${baseContext} This is a legal/compliance page. Answer questions about the content but remind users to seek professional advice for specific situations.`;
        default:
          return `${baseContext} Help users find fractional executive jobs, understand roles, or learn about hiring fractional talent.`;
      }
    }

    // For custom children with pageContext string
    const contextString = 'pageContext' in props ? props.pageContext : 'Fractional Quest';
    return `You are on the "${contextString}" page on Fractional Quest. Help users find fractional executive jobs, understand roles, or learn about hiring fractional talent in this market.`;
  };

  // Build page context for voice
  const voicePageContext = page
    ? {
        pageType: page.page_type as 'guide' | 'services' | 'hiring_guide' | 'salary' | 'home' | 'jobs',
        pageH1: page.hero_title || page.title,
        pageUrl: `/${page.slug}`,
        pageDescription: page.meta_description || undefined,
      }
    : {
        pageType: 'jobs' as const,
        pageH1: 'pageContext' in props ? props.pageContext : 'Fractional Quest',
        pageUrl: '/',
        pageDescription: 'initialContent' in props ? props.initialContent : undefined,
      };

  return (
    <CopilotSidebar
      instructions={getInstructions()}
      labels={{
        title: "Fractional Quest AI",
        initial: "Hi! I can help you understand this page, find jobs, or answer questions about fractional executives. What would you like to know?",
      }}
      className="h-full"
    >
      {/* Voice Widget - Fixed position */}
      <div className="fixed bottom-6 right-6 z-50">
        <VoiceInput
          onMessage={handleVoiceMessage}
          firstName={firstName}
          userId={user?.id || null}
          pageContext={voicePageContext}
        />
      </div>

      {/* Page Content - either PageRenderer for structured pages or children */}
      {page ? <PageRenderer page={page} /> : ('children' in props ? props.children : null)}
    </CopilotSidebar>
  );
}
