'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPath, localizeUrl } from '@/i18n/config'

// Simplified footer - key pages only
const footerLinks = {
  findJobs: {
    title: 'Find Jobs',
    links: [
      { name: 'All UK Jobs', href: '/fractional-jobs-uk' },
      { name: 'CFO Jobs', href: '/fractional-cfo-jobs-uk' },
      { name: 'CTO Jobs', href: '/fractional-cto-jobs-uk' },
      { name: 'CMO Jobs', href: '/fractional-cmo-jobs-uk' },
      { name: 'COO Jobs', href: '/fractional-coo-jobs-uk' },
      { name: 'Remote Jobs', href: '/remote-fractional-jobs' },
    ],
  },
  workTypes: {
    title: 'Work Types',
    links: [
      { name: 'Fractional Jobs', href: '/fractional-jobs-uk' },
      { name: 'Interim Jobs', href: '/interim-jobs-uk' },
      { name: 'Part-Time Jobs', href: '/part-time-jobs-uk' },
      { name: 'Advisory Jobs', href: '/advisory-jobs-uk' },
    ],
  },
  locations: {
    title: 'Locations',
    links: [
      { name: 'London', href: '/fractional-jobs-london' },
      { name: 'Manchester', href: '/manchester' },
      { name: 'Edinburgh', href: '/edinburgh' },
      { name: 'Remote UK', href: '/remote-fractional-jobs' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'Salary Guides', href: '/fractional-cfo-salary' },
      { name: 'Rate Calculator', href: '/rate-calculator' },
      { name: 'What is Fractional?', href: '/fractional-cfo' },
      { name: 'Portfolio Career Guide', href: '/fractional-executive-portfolio' },
    ],
  },
  forEmployers: {
    title: 'For Employers',
    links: [
      { name: 'Fractional Recruitment Agency', href: '/fractional-recruitment-agency' },
      { name: 'Post a Role', href: '/contact' },
      { name: 'Executive Search', href: '/executive-search-firms' },
      { name: 'Book a Call', href: '/book-call' },
    ],
  },
}

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/company/fractional-quest', icon: LinkedInIcon },
  { name: 'Twitter', href: 'https://twitter.com/fractionalquest', icon: TwitterIcon },
]

export function Footer() {
  const pathname = usePathname()
  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname])
  const localize = (href: string) => localizeUrl(href, locale)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer content - simplified */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="font-semibold text-white text-lg">
                Fractional<span className="text-emerald-400">Quest</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              UK&apos;s leading platform for fractional executive jobs.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.findJobs.title}</h3>
            <ul className="space-y-2">
              {footerLinks.findJobs.links.map((link) => (
                <li key={link.href}>
                  <Link href={localize(link.href)} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.workTypes.title}</h3>
            <ul className="space-y-2">
              {footerLinks.workTypes.links.map((link) => (
                <li key={link.href}>
                  <Link href={localize(link.href)} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.locations.title}</h3>
            <ul className="space-y-2">
              {footerLinks.locations.links.map((link) => (
                <li key={link.href}>
                  <Link href={localize(link.href)} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.resources.title}</h3>
            <ul className="space-y-2">
              {footerLinks.resources.links.map((link) => (
                <li key={link.href}>
                  <Link href={localize(link.href)} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{footerLinks.forEmployers.title}</h3>
            <ul className="space-y-2">
              {footerLinks.forEmployers.links.map((link) => (
                <li key={link.href}>
                  <Link href={localize(link.href)} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Fractional Quest. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-gray-200 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gray-200 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-gray-200 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/compliance" className="text-gray-400 hover:text-gray-200 transition-colors">
                Compliance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Icons
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
