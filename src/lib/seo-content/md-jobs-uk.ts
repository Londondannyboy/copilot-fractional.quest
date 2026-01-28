// SEO Content for Fractional Managing Director Jobs UK Page

export const mdJobsUkSEO = {
  meta: {
    title: "Fractional Managing Director Jobs UK | Part-Time MD Roles",
    description: "Fractional Managing Director jobs UK. Part-time MD roles paying £950-£1,400/day for growth companies.",
    keywords: ["fractional managing director jobs uk", "fractional md", "part time managing director", "interim md jobs"],
  },
  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "UK Jobs", url: "/fractional-jobs-uk" },
    { name: "Managing Director Jobs", url: "/fractional-managing-director-jobs-uk" },
  ],
  hero: {
    headline: "Fractional Managing Director Jobs UK",
    subtitle: "Part-time Managing Director roles across the UK. Day rates £950-£1,400.",
    stats: { avgDayRate: "£950-£1,400", hubStatus: "Strong Demand", hybridOptions: "50% Hybrid" },
  },
  authorityLinks: [
    { name: "Institute of Directors", url: "https://www.iod.com", context: "Director standards" },
    { name: "CBI", url: "https://www.cbi.org.uk", context: "Business confederation" },
  ],
  statistics: {
    marketGrowth: { value: "150%", description: "Growth in fractional MD demand since 2021", source: "IoD" },
    averageDayRate: { value: "£1,175", description: "Average day rate for fractional MDs", source: "Market Analysis" },
  },
  content: {
    whyLocation: {
      title: "Executive Leadership on Demand",
      paragraphs: [
        "The <strong>fractional Managing Director</strong> provides hands-on operational leadership for businesses needing senior management without full-time commitment. Unlike a CEO focused on strategy and investors, an MD drives day-to-day operations and team performance.",
        "PE portfolio companies, family businesses, and scale-ups increasingly hire <strong>fractional MDs</strong> for turnarounds, growth phases, or while recruiting permanent leadership.",
      ],
    },
    dayRates: {
      title: "Day Rates by Context",
      description: "Day rates vary by company situation:",
      rates: [
        { role: "PE Portfolio", range: "£1,100 - £1,700/day", typical: "£1,400", annual: "£220-340k" },
        { role: "Turnaround", range: "£1,000 - £1,500/day", typical: "£1,250", annual: "£200-300k" },
        { role: "Growth/Scale", range: "£950 - £1,400/day", typical: "£1,175", annual: "£190-280k" },
      ],
    },
    locations: {
      title: "Key Sectors for Managing Directors",
      areas: [
        { name: "PE Portfolio", description: "Private equity portfolio companies needing operational leadership.", sectors: ["Private Equity", "Growth Equity", "Buyout"] },
        { name: "Family Business", description: "Family-owned businesses needing professional management.", sectors: ["Manufacturing", "Distribution", "Services"] },
        { name: "Scale-Up", description: "Fast-growing companies needing experienced leadership.", sectors: ["Tech", "E-commerce", "Services"] },
        { name: "Turnaround", description: "Distressed businesses needing restructuring.", sectors: ["Manufacturing", "Retail", "Hospitality"] },
      ],
    },
    emergingRoles: {
      title: "Specialist MD Roles",
      roles: [
        { title: "Turnaround MD", description: "Restructuring, cost reduction, and performance improvement.", rate: "£1,100-£1,500/day" },
        { title: "Integration MD", description: "Post-acquisition integration and change management.", rate: "£1,200-£1,600/day" },
        { title: "Growth MD", description: "Scaling operations and building teams.", rate: "£1,000-£1,400/day" },
        { title: "Interim MD", description: "Bridge leadership during recruitment or transition.", rate: "£1,100-£1,700/day" },
      ],
    },
  },
  faqs: [
    { question: "What's the difference between an MD and CEO?", answer: "In UK usage, a Managing Director typically has hands-on operational responsibility for running a business, while a CEO may have a more strategic, investor-facing role. In many SMEs, these titles are used interchangeably." },
    { question: "How much do fractional Managing Directors earn?", answer: "UK fractional MDs typically earn £950-£1,400 per day, with PE-backed and turnaround roles at the premium end." },
  ],
  relatedPages: [
    { name: "UK Fractional Jobs", url: "/fractional-jobs-uk" },
    { name: "Fractional CEO Jobs UK", url: "/fractional-ceo-jobs-uk" },
    { name: "Fractional COO Jobs UK", url: "/fractional-coo-jobs-uk" },
  ],
  schema: { organization: { "@type": "Organization", name: "Fractional Quest", url: "https://fractional.quest" } },
};
export type MDJobsUkSEOContent = typeof mdJobsUkSEO;
