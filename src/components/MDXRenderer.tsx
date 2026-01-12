"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "@/lib/mdx-components";

interface MDXRendererProps {
  source: MDXRemoteSerializeResult;
  className?: string;
}

/**
 * MDXRenderer - Renders pre-serialized MDX content with registered components
 *
 * Usage:
 * ```tsx
 * // In a server component, serialize the MDX first:
 * import { serialize } from 'next-mdx-remote/serialize';
 * const mdxSource = await serialize(rawMdxString);
 *
 * // Then pass to MDXRenderer:
 * <MDXRenderer source={mdxSource} />
 * ```
 */
export function MDXRenderer({ source, className }: MDXRendererProps) {
  return (
    <div className={className || "mdx-content prose prose-lg max-w-none"}>
      <MDXRemote {...source} components={mdxComponents} />
    </div>
  );
}

/**
 * MDXRendererAsync - For use with RSC (React Server Components)
 * Uses next-mdx-remote/rsc for server-side MDX compilation
 */
export { MDXRemote as MDXRendererRSC } from "next-mdx-remote/rsc";
