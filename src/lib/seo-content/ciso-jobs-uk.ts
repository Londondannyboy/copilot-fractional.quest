// SEO Content for Fractional CISO Jobs UK Page

export const cisoJobsUkSEO = {
  meta: {
    title: "Fractional CISO Jobs UK | Part-Time Security Leadership Roles",
    description:
      "Find fractional CISO and part-time security leadership jobs across the UK. Day rates £1,000-£1,500. Companies seeking interim cybersecurity leadership.",
    keywords: [
      "fractional ciso jobs uk",
      "fractional ciso",
      "part time ciso uk",
      "interim ciso jobs",
      "fractional security officer",
      "portfolio ciso",
      "virtual ciso uk",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs" },
    { name: "CISO Jobs", url: "/fractional-ciso-jobs-uk" },
  ],

  hero: {
    headline: "Fractional CISO Jobs UK",
    subtitle:
      "Part-time Cybersecurity Leadership and CISO roles across the United Kingdom",
    stats: {
      avgDayRate: "£1,000-£1,500",
      hubStatus: "Security Leadership",
      hybridOptions: "75% Hybrid",
    },
  },

  content: {
    whyLocation: {
      title: "Why Fractional CISO Demand is Surging",
      paragraphs: [
        "With cyber threats increasing and regulatory requirements tightening, every company needs security leadership. The fractional CISO model delivers experienced cybersecurity expertise without the £200k+ full-time cost.",
        "Whether you're a former CISO seeking portfolio work, a Security Director ready for C-suite challenges, or a consultant looking for ongoing engagements, the UK fractional CISO market offers exceptional opportunities.",
      ],
    },

    dayRates: {
      title: "Fractional CISO Day Rates by Sector",
      description:
        "Day rates vary by regulatory requirements and security complexity:",
      rates: [
        { role: "Financial Services", range: "£1,200 - £1,800/day", typical: "£1,500" },
        { role: "Healthcare/NHS", range: "£1,100 - £1,500/day", typical: "£1,300" },
        { role: "Tech/SaaS", range: "£1,000 - £1,400/day", typical: "£1,200" },
        { role: "Retail/eCommerce", range: "£900 - £1,300/day", typical: "£1,100" },
        { role: "SME/Startup", range: "£800 - £1,200/day", typical: "£1,000" },
      ],
    },

    locations: {
      title: "Key CISO Sectors",
      areas: [
        {
          name: "Financial Services",
          description:
            "FCA-regulated firms need CISOs familiar with PRA requirements, DORA compliance, and financial sector threat landscape. Premium rates.",
        },
        {
          name: "Healthcare & NHS",
          description:
            "DSPT compliance, patient data protection, and healthcare-specific threats. Growing demand post-pandemic.",
        },
        {
          name: "Tech & SaaS",
          description:
            "SOC 2 certification, customer security requirements, and secure development practices. Often combined with CTO responsibilities.",
        },
      ],
    },

    emergingRoles: {
      title: "Specialist CISO Roles",
      roles: [
        {
          title: "Virtual CISO (vCISO)",
          description:
            "Ongoing security leadership for multiple clients. Policy development, risk management, and board reporting.",
        },
        {
          title: "Compliance CISO",
          description:
            "Specialists in ISO 27001, SOC 2, GDPR, and sector-specific regulations. Certification-focused engagements.",
        },
        {
          title: "Incident Response Lead",
          description:
            "Crisis management, breach response, and security operations. High-intensity, project-based work.",
        },
        {
          title: "Security Transformation",
          description:
            "Security programme development, team building, and maturity improvement. Multi-month engagements.",
        },
      ],
    },
  },

  faqs: [
    {
      question: "What qualifications do fractional CISOs need?",
      answer:
        "Most fractional CISO roles require CISSP, CISM, or equivalent certifications plus 10-15+ years security experience. Prior CISO or Security Director experience is typically essential. Sector-specific credentials (financial services, healthcare) add significant value.",
    },
    {
      question: "How much do fractional CISOs earn in the UK?",
      answer:
        "UK fractional CISOs typically earn £1,000-£1,500 per day, with financial services and healthcare at the premium end. Working 2-3 days per week across multiple clients, annual earnings often exceed full-time CISO salaries.",
    },
    {
      question: "What's the typical fractional CISO engagement?",
      answer:
        "Initial engagements typically run 6-12 months with 1-2 days per week commitment. Many companies need less intensive ongoing support once security foundations are established. Compliance projects may be more intensive.",
    },
    {
      question: "Do fractional CISOs work remotely?",
      answer:
        "About 75% of fractional CISO roles offer hybrid or fully remote arrangements. Security leadership is increasingly remote-friendly, though some on-site presence is expected for board meetings, audits, and sensitive discussions.",
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

export type CISOJobsUkSEOContent = typeof cisoJobsUkSEO;
