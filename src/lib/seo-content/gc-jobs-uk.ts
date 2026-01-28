// SEO Content for Fractional General Counsel Jobs UK Page

export const gcJobsUkSEO = {
  meta: {
    title: "Fractional General Counsel Jobs UK | Part-Time Legal Counsel",
    description: "Fractional General Counsel jobs UK. Part-time GC and legal counsel roles paying £900-£1,400/day.",
    keywords: ["fractional general counsel jobs uk", "fractional gc", "part time general counsel", "interim legal counsel jobs"],
  },
  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs-uk" },
    { name: "General Counsel Jobs", url: "/fractional-general-counsel-jobs-uk" },
  ],
  hero: {
    headline: "Fractional General Counsel Jobs UK",
    subtitle: "Part-time General Counsel and Chief Legal Officer roles. Day rates £900-£1,400.",
    stats: { avgDayRate: "£900-£1,400", hubStatus: "Growing Demand", hybridOptions: "60% Hybrid" },
  },
  authorityLinks: [
    { name: "The Law Society", url: "https://www.lawsociety.org.uk", context: "Solicitors regulatory body" },
    { name: "Bar Council", url: "https://www.barcouncil.org.uk", context: "Barristers body" },
  ],
  statistics: {
    marketGrowth: { value: "220%", description: "Growth in fractional GC demand since 2021", source: "Legal Week" },
    averageDayRate: { value: "£1,150", description: "Average day rate for fractional GCs", source: "Market Analysis" },
  },
  content: {
    whyLocation: {
      title: "Legal Leadership on Demand: The UK Market",
      paragraphs: [
        "The <strong>fractional General Counsel</strong> model has grown rapidly as companies recognise the need for senior legal oversight without full-time costs. PE-backed companies, scale-ups, and regulated businesses increasingly hire part-time GCs.",
        "Whether you're a qualified solicitor or barrister seeking portfolio work, the UK <strong>fractional General Counsel jobs</strong> market offers compelling opportunities in commercial, corporate, and regulatory law.",
      ],
    },
    dayRates: {
      title: "Day Rates by Sector",
      description: "Day rates vary by complexity and sector:",
      rates: [
        { role: "Financial Services", range: "£1,100 - £1,600/day", typical: "£1,300", annual: "£220-320k" },
        { role: "PE-Backed", range: "£1,000 - £1,500/day", typical: "£1,200", annual: "£200-300k" },
        { role: "Tech/SaaS", range: "£900 - £1,300/day", typical: "£1,100", annual: "£180-260k" },
      ],
    },
    locations: {
      title: "Key Sectors for General Counsel",
      areas: [
        { name: "Financial Services", description: "Banks, insurers, and asset managers needing regulatory expertise.", sectors: ["Banking", "Insurance", "Asset Management"] },
        { name: "Technology", description: "Tech companies needing IP, data privacy, and commercial contracts.", sectors: ["SaaS", "FinTech", "E-commerce"] },
        { name: "PE-Backed", description: "Portfolio companies needing M&A and commercial support.", sectors: ["Private Equity", "Growth Equity", "VC"] },
        { name: "Life Sciences", description: "Pharma and biotech needing regulatory and IP expertise.", sectors: ["Pharma", "BioTech", "MedTech"] },
      ],
    },
    emergingRoles: {
      title: "Specialist Legal Roles",
      roles: [
        { title: "Commercial GC", description: "Contracts, partnerships, and commercial negotiations.", rate: "£1,000-£1,400/day" },
        { title: "Regulatory GC", description: "FCA, compliance, and regulatory matters.", rate: "£1,100-£1,500/day" },
        { title: "M&A GC", description: "Deal execution, due diligence, and integration.", rate: "£1,200-£1,600/day" },
        { title: "Data & Privacy GC", description: "GDPR, data protection, and privacy.", rate: "£1,000-£1,400/day" },
      ],
    },
  },
  faqs: [
    { question: "What qualifications do fractional GCs need?", answer: "Most require qualification as a solicitor or barrister with 10-15+ years PQE. In-house experience is highly valued, particularly in commercial contracts, M&A, and regulatory matters." },
    { question: "How much do fractional General Counsels earn?", answer: "UK fractional GCs typically earn £900-£1,400 per day, with financial services and PE-backed roles at the premium end." },
  ],
  relatedPages: [
    { name: "UK Fractional Jobs", url: "/fractional-jobs-uk" },
    { name: "Fractional CFO Jobs UK", url: "/fractional-cfo-jobs-uk" },
  ],
  schema: { organization: { "@type": "Organization", name: "Fractional Quest", url: "https://fractional.quest" } },
};
export type GCJobsUkSEOContent = typeof gcJobsUkSEO;
