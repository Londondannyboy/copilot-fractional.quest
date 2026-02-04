"use client";

import { ReactNode } from "react";
import { PageRenderer } from "./PageRenderer";
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

export function PageWithCopilot(props: PageWithCopilotProps) {
  // Get user from Neon Auth
  const { data: session } = authClient.useSession();

  // Check if we're rendering a structured page or custom children
  const isStructuredPage = 'page' in props && props.page;
  const page = isStructuredPage ? props.page : null;

  return (
    <>
      {/* Page Content - either PageRenderer for structured pages or children */}
      {page ? <PageRenderer page={page} /> : ('children' in props ? props.children : null)}
    </>
  );
}
