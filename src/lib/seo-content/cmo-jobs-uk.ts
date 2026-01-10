// SEO Content for Fractional CMO Jobs UK Page

export const cmoJobsUkSEO = {
  meta: {
    title: "Fractional CMO Jobs UK | Part-Time Marketing Leadership Roles",
    description:
      "Find fractional CMO and part-time marketing director jobs across the UK. Day rates £850-£1,300. B2B, D2C, and growth-stage companies seeking interim marketing leadership.",
    keywords: [
      "fractional cmo jobs uk",
      "fractional cmo",
      "part time cmo uk",
      "interim cmo jobs",
      "fractional marketing director",
      "portfolio cmo",
      "part time marketing director",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs" },
    { name: "CMO Jobs", url: "/fractional-cmo-jobs-uk" },
  ],

  hero: {
    headline: "Fractional CMO Jobs UK",
    subtitle:
      "Part-time Marketing Leadership and CMO roles across the United Kingdom",
    stats: {
      avgDayRate: "£850-£1,300",
      hubStatus: "Growth Roles",
      hybridOptions: "80% Hybrid",
    },
  },

  content: {
    whyLocation: {
      title: "Why Fractional CMO Demand is Accelerating",
      paragraphs: [
        "UK companies increasingly recognise that senior marketing leadership doesn't require a full-time hire. The fractional CMO model delivers brand strategy, growth marketing, and team leadership on a flexible basis that scales with business needs.",
        "Whether you're a former CMO seeking portfolio work, a Marketing Director ready for C-suite challenges, or a growth leader looking to diversify, the UK fractional CMO market offers compelling opportunities across B2B, D2C, and enterprise sectors.",
      ],
    },

    dayRates: {
      title: "Fractional CMO Day Rates by Sector",
      description:
        "Day rates vary by sector and marketing complexity:",
      rates: [
        { role: "VC-Backed", range: "£1,000 - £1,400/day", typical: "£1,200" },
        { role: "B2B SaaS", range: "£900 - £1,300/day", typical: "£1,100" },
        { role: "D2C/eCommerce", range: "£850 - £1,200/day", typical: "£1,000" },
        { role: "Professional Services", range: "£800 - £1,100/day", typical: "£950" },
        { role: "Non-Profit", range: "£600 - £900/day", typical: "£750" },
      ],
    },

    locations: {
      title: "Key CMO Sectors",
      areas: [
        {
          name: "B2B SaaS & Tech",
          description:
            "High demand for CMOs with product-led growth experience, demand generation expertise, and revenue marketing skills. Often integrated with sales leadership.",
        },
        {
          name: "D2C & eCommerce",
          description:
            "Brand building, performance marketing, and customer acquisition specialists. Strong analytics and creative direction skills required.",
        },
        {
          name: "Professional Services",
          description:
            "Thought leadership, content marketing, and business development support. Often combined with BD responsibilities.",
        },
      ],
    },

    emergingRoles: {
      title: "Specialist CMO Roles",
      roles: [
        {
          title: "Growth CMO",
          description:
            "Performance marketing, conversion optimization, and data-driven growth. Often works closely with product teams.",
        },
        {
          title: "Brand CMO",
          description:
            "Brand strategy, creative direction, and positioning. Focus on brand building over performance metrics.",
        },
        {
          title: "Revenue CMO",
          description:
            "Marketing and sales alignment, pipeline generation, and revenue attribution. Common in B2B.",
        },
        {
          title: "Product Marketing Lead",
          description:
            "Go-to-market strategy, positioning, and launch execution. Bridge between product and marketing.",
        },
      ],
    },
  },

  faqs: [
    {
      question: "What qualifications do fractional CMOs need?",
      answer:
        "Most fractional CMO roles require 10-15+ years of marketing experience with prior CMO, VP Marketing, or Marketing Director experience. Proven track record of driving growth, building teams, and developing brand strategy is essential. Sector-specific experience (B2B, D2C, etc.) often required.",
    },
    {
      question: "How much do fractional CMOs earn in the UK?",
      answer:
        "UK fractional CMOs typically earn £850-£1,300 per day, with VC-backed and B2B SaaS roles at the premium end. Working 2-3 days per week across multiple clients, annual earnings are competitive with full-time CMO salaries while offering variety and flexibility.",
    },
    {
      question: "What's the typical fractional CMO engagement?",
      answer:
        "Initial engagements typically run 6-12 months with 2-3 days per week commitment. Growth-stage companies often need more intensive engagement during key launches or fundraising. Many relationships become long-term as companies value marketing continuity.",
    },
    {
      question: "Do fractional CMOs work remotely?",
      answer:
        "About 80% of fractional CMO roles offer hybrid or fully remote arrangements. Marketing leadership is increasingly remote-friendly, though some on-site presence is often expected for team leadership, creative sessions, and executive meetings.",
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

export type CMOJobsUkSEOContent = typeof cmoJobsUkSEO;
