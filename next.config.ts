import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Enable MDX pages
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  serverExternalPackages: ["@copilotkit/runtime"],
  // Experimental optimizations for better performance
  experimental: {
    // Optimize package imports for tree-shaking
    optimizePackageImports: ['recharts', 'lucide-react', '@copilotkit/react-ui'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      // Note: /virtual-cfo, /virtual-cto, /virtual-coo, /virtual-ciso now have dedicated pages
      // Keeping virtual-cfo-services and virtual-cmo-services as redirects for now
      {
        source: '/virtual-cfo-services',
        destination: '/virtual-cfo',
        permanent: true,
      },
      {
        source: '/virtual-cmo-services',
        destination: '/fractional-cmo-services',
        permanent: true,
      },
      {
        source: '/virtual-cto-services',
        destination: '/virtual-cto',
        permanent: true,
      },
      {
        source: '/virtual-coo-services',
        destination: '/virtual-coo',
        permanent: true,
      },
      {
        source: '/virtual-ciso-services',
        destination: '/virtual-ciso',
        permanent: true,
      },
      // 404 fixes - redirect to closest relevant pages
      {
        source: '/product-manager-jobs-uk',
        destination: '/fractional-cpo-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-head-of-product-jobs-uk',
        destination: '/fractional-cpo-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-cmo-responsibilities',
        destination: '/fractional-cmo',
        permanent: true,
      },
      {
        source: '/fractional-executive-contract-template',
        destination: '/fractional-jobs-uk',
        permanent: false,
      },
      {
        source: '/destinations/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/signs-you-need-fractional-compliance-officer',
        destination: '/fractional-ciso-jobs-uk',
        permanent: false,
      },
      {
        source: '/compliance',
        destination: '/fractional-ciso-jobs-uk',
        permanent: true,
      },
      {
        source: '/marketing-director-jobs-uk',
        destination: '/fractional-cmo-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-head-of-marketing-jobs-uk',
        destination: '/fractional-cmo-jobs-uk',
        permanent: true,
      },
      {
        source: '/engineering-manager-jobs-uk',
        destination: '/fractional-cto-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-vp-engineering-jobs-uk',
        destination: '/fractional-cto-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-director-jobs-uk',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      {
        source: '/how-to-become-a-fractional-executive',
        destination: '/fractional-jobs-uk',
        permanent: false,
      },
      {
        source: '/fractional-talent',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      {
        source: '/london',
        destination: '/fractional-jobs-london',
        permanent: true, // 301 redirect for SEO
      },
      {
        source: '/fractional-jobs-manchester',
        destination: '/manchester',
        permanent: true,
      },
      {
        source: '/fractional-jobs-birmingham',
        destination: '/birmingham',
        permanent: true,
      },
      {
        source: '/fractional-jobs-edinburgh',
        destination: '/edinburgh',
        permanent: true,
      },
      {
        source: '/fractional-jobs-bristol',
        destination: '/bristol',
        permanent: true,
      },
      // High-impression missing pages - redirect to homepage (main target for "fractional recruitment agency")
      {
        source: '/top-fractional-recruitment-agencies',
        destination: '/',
        permanent: true,
      },
      {
        source: '/top-fractional-recruitment-agencies-best-fractional-recruitment-agency-fractional-recruiter',
        destination: '/',
        permanent: true,
      },
      {
        source: '/fractional-recruitment-agency',
        destination: '/',
        permanent: true, // Consolidate link equity to homepage
      },
      {
        source: '/fractional-hr',
        destination: '/fractional-chro-jobs-uk',
        permanent: true,
      },
      // /part-time-cfo now has dedicated page in database
      {
        source: '/interim-executive',
        destination: '/fractional-jobs-uk',
        permanent: false,
      },
      {
        source: '/fractional-cfo-meaning',
        destination: '/fractional-cfo',
        permanent: true,
      },
      {
        source: '/fractional-ciso-meaning',
        destination: '/fractional-ciso',
        permanent: true,
      },
      // GSC indexed URLs without -uk suffix
      {
        source: '/fractional-ciso-jobs',
        destination: '/fractional-ciso-jobs-uk',
        permanent: true,
      },
      // /interim-cfo now has dedicated page in database
      {
        source: '/interim-cmo',
        destination: '/interim-cmo-jobs-uk',
        permanent: true,
      },
      {
        source: '/interim-cto',
        destination: '/interim-cto-jobs-uk',
        permanent: true,
      },
      {
        source: '/interim-coo',
        destination: '/interim-coo-jobs-uk',
        permanent: true,
      },
      // Short role URLs - /cfo, /cmo, /cto, /coo now have dedicated pages in database
      // Other GSC URLs
      {
        source: '/fractional-jobs',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      {
        source: '/guide',
        destination: '/fractional-jobs-uk',
        permanent: false,
      },
      // Location redirects - now point to proper locale pages
      {
        source: '/fractional-jobs-au',
        destination: '/au/fractional-jobs',
        permanent: false,
      },
      {
        source: '/fractional-jobs-us',
        destination: '/us/fractional-jobs',
        permanent: false,
      },
      // HR → CHRO redirects
      {
        source: '/fractional-hr-salary',
        destination: '/fractional-chro-salary',
        permanent: true,
      },
      {
        source: '/fractional-hr-roles',
        destination: '/fractional-chro-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-hr-director',
        destination: '/fractional-chro-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-hr-jobs-uk',
        destination: '/fractional-chro-jobs-uk',
        permanent: true,
      },
      // What-is redirects
      {
        source: '/what-is-a-fractional-cto',
        destination: '/fractional-cto',
        permanent: true,
      },
      {
        source: '/what-is-a-fractional-ceo-guide',
        destination: '/fractional-ceo',
        permanent: true,
      },
      {
        source: '/what-is-fractional',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      // Near-me and specific redirects
      {
        source: '/fractional-cfo-near-me',
        destination: '/fractional-cfo-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-cto-hourly-rate',
        destination: '/fractional-cto-salary',
        permanent: true,
      },
      {
        source: '/fractional-coo-meaning',
        destination: '/fractional-coo',
        permanent: true,
      },
      // General redirects
      {
        source: '/fractional-executive',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-executive-guide',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-roles',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-services',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-agency',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-data',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-consulting',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-marketing',
        destination: '/fractional-cmo-jobs-uk',
        permanent: true,
      },
      // Operations redirects
      {
        source: '/fractional-operations-director',
        destination: '/fractional-coo-jobs-uk',
        permanent: true,
      },
      {
        source: '/fractional-operations-jobs',
        destination: '/fractional-coo-jobs-uk',
        permanent: true,
      },
      // Interim redirects
      {
        source: '/interim-jobs-uk',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      // Remote guide redirect
      {
        source: '/remote-fractional-jobs-guide',
        destination: '/remote-fractional-jobs',
        permanent: true,
      },
      // Article path redirects to non-article versions
      {
        source: '/articles/remote-fractional-jobs',
        destination: '/remote-fractional-jobs',
        permanent: true,
      },
      {
        source: '/articles/fractional-jobs-manchester',
        destination: '/manchester',
        permanent: true,
      },
      {
        source: '/articles/fractional-roles',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      {
        source: '/articles/fractional-cfo-services-uk',
        destination: '/fractional-cfo-services',
        permanent: true,
      },
      {
        source: '/articles/fractional-cfo-jobs-uk',
        destination: '/fractional-cfo-jobs-uk',
        permanent: true,
      },
      {
        source: '/articles/remote-fractional-jobs-guide',
        destination: '/remote-fractional-jobs',
        permanent: true,
      },
      // Off-topic redirect
      {
        source: '/fractional-property-ownership-uk',
        destination: '/',
        permanent: false,
      },
      // Misc indexed URLs
      {
        source: '/fractional-client-services-services',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      // Company pages → homepage (until we build proper route)
      {
        source: '/company/:domain*',
        destination: '/',
        permanent: false,
      },
      // Short URL redirects (fixes meta refresh issues from Ahrefs report)
      {
        source: '/remote',
        destination: '/remote-fractional-jobs',
        permanent: true,
      },
      {
        source: '/hr',
        destination: '/fractional-chro-jobs-uk',
        permanent: true,
      },
      // Procurement page redirect
      {
        source: '/fractional-procurement-jobs',
        destination: '/fractional-procurement-jobs-uk',
        permanent: true,
      },
      // Job URL pattern redirect (old /job/* to new /fractional-job/*)
      {
        source: '/job/:path*',
        destination: '/fractional-job/:path*',
        permanent: true,
      },
      // Fix broken job URLs from 404 audit (Jan 2026)
      {
        source: '/fractional-job/null',
        destination: '/fractional-jobs-uk',
        permanent: false, // Bug fix, not permanent redirect
      },
      // CRO variant pages - redirect to main CRO page
      {
        source: '/interim-cro-jobs-uk',
        destination: '/fractional-cro-jobs-uk',
        permanent: true,
      },
      {
        source: '/part-time-cro-jobs-uk',
        destination: '/fractional-cro-jobs-uk',
        permanent: true,
      },
      // Query string URLs - let them 404 naturally or redirect base
      {
        source: '/fractional-jobs-articles',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      {
        source: '/jobs',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
      {
        source: '/articles',
        destination: '/fractional-jobs-uk',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      // Extended roles - CDO now served via [slug] route with IntelligentPageRenderer
      {
        source: '/fractional-cro-jobs-uk',
        destination: '/articles/fractional-cro-jobs-uk',
      },
      {
        source: '/fractional-cgo-jobs-uk',
        destination: '/articles/fractional-cgo-jobs-uk',
      },
      {
        source: '/fractional-cao-jobs-uk',
        destination: '/articles/fractional-cao-jobs-uk',
      },
      {
        source: '/fractional-cso-jobs-uk',
        destination: '/articles/fractional-cso-jobs-uk',
      },
      // Location pages from articles
      {
        source: '/fractional-jobs-belfast',
        destination: '/articles/fractional-jobs-belfast',
      },
      {
        source: '/fractional-jobs-leeds',
        destination: '/articles/fractional-jobs-leeds',
      },
      {
        source: '/fractional-jobs-ecommerce',
        destination: '/articles/fractional-jobs-ecommerce',
      },
      // Guide pages from articles
      {
        source: '/portfolio-career',
        destination: '/articles/portfolio-career',
      },
      {
        source: '/fractional-executive-salary-guide-2025',
        destination: '/articles/fractional-executive-salary-guide-2025',
      },
      {
        source: '/articles/fractional-executive-salary-guide-2025',
        destination: '/articles/fractional-executive-salary-guide-2025',
      },
      {
        source: '/how-to-become-a-fractional-cto',
        destination: '/articles/how-to-become-a-fractional-cto',
      },
      {
        source: '/how-to-become-fractional-cfo',
        destination: '/articles/how-to-become-fractional-cfo',
      },
      {
        source: '/fractional-hr-vs-full-time',
        destination: '/articles/fractional-hr-vs-full-time',
      },
      {
        source: '/fractional-cfo-vs-full-time-cfo-comparison',
        destination: '/articles/fractional-cfo-vs-full-time-cfo-comparison',
      },
      {
        source: '/benefits-of-fractional-executives',
        destination: '/articles/benefits-of-fractional-executives',
      },
      {
        source: '/articles/benefits-of-fractional-executives',
        destination: '/articles/benefits-of-fractional-executives',
      },
      {
        source: '/fractional-executives-for-startups',
        destination: '/articles/fractional-executives-for-startups',
      },
      {
        source: '/articles/fractional-executives-for-startups',
        destination: '/articles/fractional-executives-for-startups',
      },
      // Jobs pages from articles
      {
        source: '/fractional-sales-director',
        destination: '/articles/fractional-sales-director',
      },
      {
        source: '/fractional-head-of-ai-jobs-uk',
        destination: '/articles/fractional-head-of-ai-jobs-uk',
      },
      {
        source: '/fractional-controller-jobs',
        destination: '/articles/fractional-controller-jobs',
      },
      // Services pages from articles
      {
        source: '/fractional-dpo-services',
        destination: '/articles/fractional-dpo-services',
      },
      {
        source: '/fractional-compliance-fintech',
        destination: '/articles/fractional-compliance-fintech',
      },
      // LinkedIn guides
      {
        source: '/linkedin-profile-optimization-fractional-executives',
        destination: '/articles/linkedin-profile-optimization-fractional-executives',
      },
      {
        source: '/linkedin-content-strategy-fractional-executives',
        destination: '/articles/linkedin-content-strategy-fractional-executives',
      },
    ]
  },
};

// Wrap config with MDX support
const withMDX = createMDX({
  // Optionally provide remark and rehype plugins
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// Wrap config with next-intl support
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Export with MDX and next-intl support
export default withNextIntl(withMDX(nextConfig));
