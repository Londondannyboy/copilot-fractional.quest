// SEO Content for London Jobs Page
// Text content preserved from fractional.quest for ranking continuity
// Code/styling rebuilt clean

export const londonSEO = {
  meta: {
    title: "Fractional Jobs London | CTO, CFO, CMO Executive Roles",
    description:
      "Premium fractional executive jobs in London. Find CTO, CFO, CMO, COO and CHRO roles with day rates from £900-£1,500. The UK's leading hub for fractional C-suite talent.",
    keywords: [
      "fractional jobs london",
      "fractional cto london",
      "fractional cfo london",
      "fractional executive london",
      "part time cto",
      "interim cfo london",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs" },
    { name: "London", url: "/fractional-jobs-london" },
  ],

  hero: {
    headline: "Fractional Jobs London",
    subtitle:
      "CTO, CFO, CMO & executive roles in the UK's leading fractional hub",
    stats: {
      avgDayRate: "£900-£1,500",
      hubStatus: "#1 UK Hub",
      hybridOptions: "60% Hybrid",
    },
  },

  content: {
    whyLondon: {
      title: "Why London Leads in Fractional Hiring",
      paragraphs: [
        "London has emerged as the UK's premier hub for fractional executive talent. With its concentration of high-growth startups, scale-ups, and established enterprises seeking flexible C-suite expertise, the capital offers unparalleled opportunities for fractional leaders.",
        "The city's diverse business ecosystem spans fintech, healthtech, proptech, and traditional sectors - all increasingly embracing the fractional model for strategic leadership. This creates a dynamic market where experienced executives can build portfolio careers while companies access top-tier talent without full-time commitment.",
      ],
    },

    dayRates: {
      title: "London Fractional Day Rates",
      description:
        "Typical day rates for fractional executives in London, based on experience and sector:",
      rates: [
        { role: "CFO", range: "£1,000 - £1,500/day", typical: "£1,200" },
        { role: "CTO", range: "£900 - £1,400/day", typical: "£1,100" },
        { role: "CMO", range: "£850 - £1,300/day", typical: "£1,000" },
        { role: "COO", range: "£900 - £1,300/day", typical: "£1,050" },
        { role: "CHRO", range: "£800 - £1,200/day", typical: "£950" },
      ],
    },

    locations: {
      title: "Key London Hubs",
      areas: [
        {
          name: "Square Mile & City",
          description:
            "Financial services, legal, and professional services dominate. High demand for fractional CFOs and compliance-focused leaders.",
        },
        {
          name: "Canary Wharf",
          description:
            "Major banks and fintech firms. Growing demand for digital transformation CTOs and finance leaders.",
        },
        {
          name: "Shoreditch & Tech City",
          description:
            "Startup central. High demand for fractional CTOs, CPOs, and CMOs comfortable with early-stage environments.",
        },
      ],
    },

    emergingRoles: {
      title: "Emerging Fractional Roles",
      roles: [
        {
          title: "Fractional CISO",
          description:
            "Cybersecurity leadership on demand - critical as threats increase.",
        },
        {
          title: "Fractional CIO",
          description:
            "IT transformation expertise for digital-first strategies.",
        },
        {
          title: "Fractional CDO",
          description:
            "Data leadership for AI/ML initiatives and analytics maturity.",
        },
        {
          title: "Fractional CCO",
          description:
            "Commercial leadership bridging sales, marketing, and growth.",
        },
      ],
    },
  },

  faqs: [
    {
      question: "What are typical fractional executive day rates in London?",
      answer:
        "London fractional executives typically command £900-£1,500 per day, with CFOs at the higher end (£1,000-£1,500) and emerging roles like CHRO slightly lower (£800-£1,200). Rates vary by sector, with fintech and private equity often paying premiums.",
    },
    {
      question: "How many days per week do London fractional roles require?",
      answer:
        "Most London fractional roles require 2-3 days per week, though this varies by company stage and needs. Early-stage startups may need more intensive initial engagement (3-4 days), while established companies often work on 1-2 days per week.",
    },
    {
      question: "Are London fractional roles hybrid or on-site?",
      answer:
        "Approximately 60% of London fractional roles offer hybrid arrangements. The City and Canary Wharf tend toward more on-site presence, while Tech City startups are generally more flexible. Most roles expect at least 1 day per week in-person.",
    },
    {
      question: "What qualifications do London fractional executives need?",
      answer:
        "London companies typically seek fractional executives with 10-15+ years of experience, including prior C-suite or senior leadership roles. Relevant sector experience, professional qualifications (ACA, CIMA for CFOs; relevant tech credentials for CTOs), and a track record of measurable impact are highly valued.",
    },
  ],

  schema: {
    organization: {
      "@type": "Organization",
      name: "Fractional Quest",
      url: "https://fractional.quest",
    },
  },
};

export type LondonSEOContent = typeof londonSEO;
