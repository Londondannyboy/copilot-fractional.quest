// SEO Content for Edinburgh Jobs Page

export const edinburghSEO = {
  meta: {
    title: "Fractional Jobs Edinburgh | CTO, CFO, CMO Executive Roles",
    description:
      "Premium fractional executive jobs in Edinburgh. Find CTO, CFO, CMO, COO and CHRO roles with day rates from £700-£1,200. Scotland's leading hub for fractional C-suite talent.",
    keywords: [
      "fractional jobs edinburgh",
      "fractional cto edinburgh",
      "fractional cfo edinburgh",
      "fractional executive edinburgh",
      "part time cto edinburgh",
      "interim cfo scotland",
      "fractional cmo scotland",
    ],
  },

  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs-uk" },
    { name: "Edinburgh", url: "/edinburgh" },
  ],

  hero: {
    headline: "Fractional Jobs Edinburgh",
    subtitle:
      "CTO, CFO, CMO & executive roles in Scotland's financial capital",
    stats: {
      avgDayRate: "£700-£1,200",
      hubStatus: "#1 Scotland Hub",
      hybridOptions: "60% Hybrid",
    },
  },

  content: {
    whyLocation: {
      title: "Why Edinburgh Leads Scotland's Fractional Market",
      paragraphs: [
        "Edinburgh has established itself as Scotland's premier hub for fractional executive talent. The city's concentration of financial services firms, combined with a thriving tech ecosystem and world-class universities, creates a sophisticated market for flexible C-suite leadership.",
        "From the asset management giants on Charlotte Square to the fintech innovators in Quartermile, Edinburgh offers diverse opportunities. The city's quality of life consistently ranks among the UK's best, attracting senior executives who want meaningful work outside London.",
        "Scotland's distinct legal and financial services sector creates unique demand for executives who understand both Scottish and UK-wide business contexts.",
      ],
    },

    dayRates: {
      title: "Edinburgh Fractional Day Rates",
      description:
        "Typical day rates for fractional executives in Edinburgh, generally 10-20% below London rates:",
      rates: [
        { role: "CFO", range: "£850 - £1,200/day", typical: "£1,000" },
        { role: "CTO", range: "£800 - £1,150/day", typical: "£950" },
        { role: "CMO", range: "£750 - £1,050/day", typical: "£900" },
        { role: "COO", range: "£800 - £1,100/day", typical: "£950" },
        { role: "CHRO", range: "£700 - £1,000/day", typical: "£850" },
      ],
    },

    locations: {
      title: "Key Edinburgh Business Areas",
      areas: [
        {
          name: "New Town & Charlotte Square",
          description:
            "Scotland's financial heart. Standard Life, Baillie Gifford, and major investment houses. High demand for fractional CFOs and investment-savvy leaders.",
        },
        {
          name: "Exchange District",
          description:
            "Modern financial services cluster. Scottish Widows, Virgin Money, and fintech firms. Strong demand for digital transformation CTOs.",
        },
        {
          name: "Quartermile & Sciennes",
          description:
            "Tech and innovation hub near the university. Skyscanner (pre-acquisition), FanDuel, and numerous startups. High demand for fractional CTOs and CPOs.",
        },
        {
          name: "Edinburgh Park",
          description:
            "Out-of-town business park with major employers including RBS/NatWest, CGI, and BT. Demand for fractional COOs and IT transformation leaders.",
        },
      ],
    },

    emergingRoles: {
      title: "In-Demand Fractional Roles in Edinburgh",
      roles: [
        {
          title: "Fractional CFO",
          description:
            "Strong demand from asset managers, PE-backed companies, and financial services firms.",
        },
        {
          title: "Fractional CTO",
          description:
            "Growing need for fintech expertise and digital transformation in traditional finance.",
        },
        {
          title: "Fractional CMO",
          description:
            "Brand and growth leadership for Scotland's expanding tech sector.",
        },
        {
          title: "Fractional CISO",
          description:
            "Cybersecurity leadership critical for financial services compliance.",
        },
      ],
    },

    sectors: {
      title: "Key Sectors Hiring Fractional Executives",
      list: [
        "Asset Management & Investment",
        "Banking & Financial Services",
        "Fintech & Insurtech",
        "Tech & Software",
        "Life Sciences & Biotech",
        "Professional Services",
      ],
    },
  },

  faqs: [
    {
      question: "What are typical fractional executive day rates in Edinburgh?",
      answer:
        "Edinburgh fractional executives typically command £700-£1,200 per day, around 10-20% below London rates. The financial services sector (CFOs, finance leaders) commands the highest rates, often matching or exceeding some London roles due to specialised demand.",
    },
    {
      question: "How does Edinburgh's market compare to London?",
      answer:
        "Edinburgh offers a concentrated market in financial services and tech, with less competition than London. Many roles specifically require Scottish financial services experience. The quality of life and lower cost of living make it attractive for senior executives.",
    },
    {
      question: "What qualifications are valued in Edinburgh?",
      answer:
        "Scottish CA qualification is highly valued for finance roles. For tech roles, Edinburgh's university links (Edinburgh, Heriot-Watt) mean academic credentials are respected. Prior experience in asset management or fintech is particularly valuable.",
    },
    {
      question: "Can I combine Edinburgh with other locations?",
      answer:
        "Yes. Edinburgh's compact size and good transport links make it easy to serve clients across Scotland (Glasgow is 45 minutes by train). Many fractional executives combine Edinburgh clients with remote work for English clients.",
    },
    {
      question: "Are Edinburgh roles hybrid or on-site?",
      answer:
        "Around 60% of Edinburgh fractional roles offer hybrid arrangements. The financial services sector tends toward more on-site presence, while tech companies are generally more flexible. Most roles expect at least 1-2 days per week in-person.",
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

export type EdinburghSEOContent = typeof edinburghSEO;
