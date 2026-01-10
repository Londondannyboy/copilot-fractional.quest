// SEO Content for Fractional CEO Jobs UK Page

export const ceoJobsUkSEO = {
  meta: {
    title: "Fractional CEO Jobs UK | Part-Time Executive Leadership Roles",
    description:
      "Find fractional CEO and part-time executive leadership jobs across the UK. Day rates £1,200-£2,000. Companies seeking interim CEO and MD leadership.",
    keywords: [
      "fractional ceo jobs uk",
      "fractional ceo",
      "part time ceo uk",
      "interim ceo jobs",
      "fractional managing director",
      "portfolio ceo",
      "part time md",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs" },
    { name: "CEO Jobs", url: "/fractional-ceo-jobs-uk" },
  ],

  hero: {
    headline: "Fractional CEO Jobs UK",
    subtitle:
      "Part-time Executive Leadership and CEO roles across the United Kingdom",
    stats: {
      avgDayRate: "£1,200-£2,000",
      hubStatus: "Executive Leadership",
      hybridOptions: "60% Hybrid",
    },
  },

  content: {
    whyLocation: {
      title: "Why Fractional CEO Demand is Emerging",
      paragraphs: [
        "An emerging model in the UK, fractional CEO roles serve companies in transition - founder-led businesses seeking experienced leadership, PE portfolio companies needing interim management, or organisations navigating strategic pivots.",
        "Whether you're a former CEO seeking portfolio work, an MD ready for broader challenges, or an experienced operator looking to guide multiple businesses, the UK fractional CEO market offers unique opportunities.",
      ],
    },

    dayRates: {
      title: "Fractional CEO Day Rates by Situation",
      description:
        "Day rates vary by company situation and complexity:",
      rates: [
        { role: "PE Portfolio", range: "£1,500 - £2,500/day", typical: "£2,000" },
        { role: "Turnaround", range: "£1,400 - £2,200/day", typical: "£1,800" },
        { role: "Scale-up", range: "£1,200 - £1,800/day", typical: "£1,500" },
        { role: "Founder Support", range: "£1,000 - £1,600/day", typical: "£1,300" },
        { role: "Non-Profit", range: "£800 - £1,400/day", typical: "£1,100" },
      ],
    },

    locations: {
      title: "Key CEO Sectors",
      areas: [
        {
          name: "PE Portfolio Companies",
          description:
            "Interim leadership during transitions, value creation initiatives, and exit preparation. Board experience essential.",
        },
        {
          name: "Founder-Led Businesses",
          description:
            "Supporting founders with operational execution while they focus on vision and product. Mentoring alongside leading.",
        },
        {
          name: "Turnaround Situations",
          description:
            "Crisis leadership, stakeholder management, and business restructuring. Intensive, project-based engagements.",
        },
      ],
    },

    emergingRoles: {
      title: "Specialist CEO Roles",
      roles: [
        {
          title: "Operating Partner",
          description:
            "PE-backed portfolio leadership across multiple companies. Board-level involvement with operational depth.",
        },
        {
          title: "Founder Coach/CEO",
          description:
            "Combined leadership and mentoring for first-time founders. Building sustainable leadership capability.",
        },
        {
          title: "Turnaround CEO",
          description:
            "Crisis management, restructuring, and business transformation. High-intensity, defined-term engagements.",
        },
        {
          title: "Scale-up CEO",
          description:
            "Taking companies through growth phases founders aren't equipped for. Series A to Series C transitions.",
        },
      ],
    },
  },

  faqs: [
    {
      question: "What qualifications do fractional CEOs need?",
      answer:
        "Fractional CEO roles require extensive leadership experience - typically 15-20+ years with prior CEO, MD, or GM experience. Board experience, P&L ownership, and demonstrated business transformation track record are essential. Sector expertise often required.",
    },
    {
      question: "How much do fractional CEOs earn in the UK?",
      answer:
        "UK fractional CEOs typically earn £1,200-£2,000 per day, with PE portfolio and turnaround roles at the premium end. Working 2-3 days per week, annual earnings can significantly exceed full-time CEO salaries while offering portfolio variety.",
    },
    {
      question: "What's the typical fractional CEO engagement?",
      answer:
        "Fractional CEO engagements vary widely - from 6-month turnarounds to multi-year founder support arrangements. Most involve 2-4 days per week commitment. Clear objectives and exit criteria are typically defined upfront.",
    },
    {
      question: "Do fractional CEOs work remotely?",
      answer:
        "About 60% of fractional CEO roles offer hybrid arrangements. CEO leadership typically requires more on-site presence than other C-suite roles for team leadership, stakeholder management, and culture embodiment.",
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

export type CEOJobsUkSEOContent = typeof ceoJobsUkSEO;
