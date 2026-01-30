'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'

// Pages that should have transparent header over hero
const TRANSPARENT_HEADER_PAGES = [
  '/fractional-jobs-london',
  '/fractional-jobs-uk',
  '/fractional-cfo-jobs-uk',
  '/fractional-cto-jobs-uk',
  '/fractional-cmo-jobs-uk',
  '/fractional-coo-jobs-uk',
  '/fractional-chro-jobs-uk',
  '/fractional-ciso-jobs-uk',
  '/fractional-cpo-jobs-uk',
  '/fractional-ceo-jobs-uk',
]

// Navigation data structure
const navigation = {
  roles: {
    label: 'Find Jobs',
    description: 'Browse by role',
    items: [
      { name: 'CFO Jobs', href: '/fractional-cfo-jobs-uk', description: 'Finance leadership roles' },
      { name: 'CTO Jobs', href: '/fractional-cto-jobs-uk', description: 'Technology leadership roles' },
      { name: 'CMO Jobs', href: '/fractional-cmo-jobs-uk', description: 'Marketing leadership roles' },
      { name: 'COO Jobs', href: '/fractional-coo-jobs-uk', description: 'Operations leadership roles' },
      { name: 'CEO Jobs', href: '/fractional-ceo-jobs-uk', description: 'Executive leadership roles' },
      { name: 'CHRO Jobs', href: '/fractional-chro-jobs-uk', description: 'HR leadership roles' },
      { name: 'CPO Jobs', href: '/fractional-cpo-jobs-uk', description: 'Product leadership roles' },
      { name: 'CISO Jobs', href: '/fractional-ciso-jobs-uk', description: 'Security leadership roles' },
    ],
    featured: [
      { name: 'All UK Jobs', href: '/fractional-jobs-uk', tag: 'Popular' },
      { name: 'Remote Jobs', href: '/remote-fractional-jobs', tag: 'Flexible' },
      { name: 'Tech Sector', href: '/fractional-jobs-tech', tag: 'Hot' },
    ]
  },
  locations: {
    label: 'Locations',
    description: 'Browse by location',
    items: [
      { name: 'London', href: '/fractional-jobs-london', count: '50+ jobs' },
      { name: 'Manchester', href: '/manchester', count: '20+ jobs' },
      { name: 'Birmingham', href: '/birmingham', count: '15+ jobs' },
      { name: 'Edinburgh', href: '/edinburgh', count: '12+ jobs' },
      { name: 'Bristol', href: '/bristol', count: '10+ jobs' },
      { name: 'All UK', href: '/fractional-jobs-uk', count: '100+ jobs' },
    ]
  },
  resources: {
    label: 'Resources',
    description: 'Guides and insights',
    items: [
      { name: 'What is a Fractional CFO?', href: '/fractional-cfo' },
      { name: 'What is a Fractional CTO?', href: '/fractional-cto' },
      { name: 'What is a Fractional CMO?', href: '/fractional-cmo' },
      { name: 'CFO Salary Guide', href: '/fractional-cfo-salary' },
      { name: 'CTO Salary Guide', href: '/fractional-cto-salary' },
      { name: 'CMO Salary Guide', href: '/fractional-cmo-salary' },
    ],
    guides: [
      { name: 'Portfolio Career Guide', href: '/articles/portfolio-career' },
      { name: 'Salary Guide 2026', href: '/articles/fractional-executive-salary-guide-2026' },
      { name: 'Benefits of Fractional', href: '/articles/benefits-of-fractional-executives' },
    ]
  },
  employers: {
    label: 'For Employers',
    description: 'Hire fractional talent',
    items: [
      { name: 'Hire a Fractional CFO', href: '/hire-fractional-cfo' },
      { name: 'Hire a Fractional CTO', href: '/hire-fractional-cto' },
      { name: 'Hire a Fractional CMO', href: '/hire-fractional-cmo' },
      { name: 'Hire a Fractional COO', href: '/hire-fractional-coo' },
      { name: 'Hire a Fractional CEO', href: '/hire-fractional-ceo' },
      { name: 'Hire a Fractional CHRO', href: '/hire-fractional-chro' },
    ],
    services: [
      { name: 'CFO Services', href: '/fractional-cfo-services' },
      { name: 'CTO Services', href: '/fractional-cto-services' },
      { name: 'CMO Services', href: '/fractional-cmo-services' },
    ]
  },
  engagementTypes: {
    label: 'Work Types',
    description: 'Browse by engagement type',
    items: [
      { name: 'Interim CFO', href: '/interim-cfo', description: 'Full-time temporary' },
      { name: 'Interim CTO', href: '/interim-cto', description: 'Full-time temporary' },
      { name: 'Interim CMO', href: '/interim-cmo', description: 'Full-time temporary' },
      { name: 'Interim CEO', href: '/interim-ceo', description: 'Full-time temporary' },
      { name: 'Interim CHRO', href: '/interim-chro', description: 'Full-time temporary' },
      { name: 'Part-Time CMO', href: '/part-time-cmo', description: 'Fixed days per week' },
      { name: 'Part-Time COO', href: '/part-time-coo', description: 'Fixed days per week' },
    ],
    featured: [
      { name: 'All Interim Jobs', href: '/interim-jobs-uk', tag: 'Full-time temp' },
      { name: 'All Part-Time Jobs', href: '/part-time-jobs-uk', tag: 'Flexible' },
      { name: 'Advisory Roles', href: '/advisory-jobs-uk', tag: 'Strategic' },
    ]
  }
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const pathname = usePathname()

  // Check if this page should have transparent header
  const isTransparentPage = TRANSPARENT_HEADER_PAGES.includes(pathname)

  // Detect touch device for dropdown behavior
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Determine if header should be transparent (not scrolled + transparent page)
  const useTransparentStyle = isTransparentPage && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : isTransparentPage ? 'bg-transparent' : 'bg-white'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${useTransparentStyle ? 'bg-white/20 backdrop-blur-sm' : 'bg-gradient-to-br from-emerald-500 to-emerald-600'}`}>
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className={`font-semibold text-lg hidden sm:block ${useTransparentStyle ? 'text-white' : 'text-gray-900'}`}>
              Fractional<span className={useTransparentStyle ? 'text-white' : 'text-emerald-700'}>Quest</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Find Jobs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => !isTouchDevice && setActiveDropdown('roles')}
              onMouseLeave={() => !isTouchDevice && setActiveDropdown(null)}
            >
              <button
                className={`px-4 py-2 font-medium flex items-center gap-1 ${useTransparentStyle ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-gray-900'}`}
                onClick={() => isTouchDevice && setActiveDropdown(activeDropdown === 'roles' ? null : 'roles')}
              >
                {navigation.roles.label}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'roles' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'roles' && (
                <div className="absolute top-full left-0 w-[90vw] max-w-[600px] bg-white rounded-xl shadow-xl border border-gray-100 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">By Role</p>
                    <div className="space-y-1">
                      {navigation.roles.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className="text-sm text-gray-500 block">{item.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Featured</p>
                    <div className="space-y-2">
                      {navigation.roles.featured.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between px-3 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{item.tag}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link
                        href="/fractional-jobs-uk"
                        className="text-emerald-700 hover:text-emerald-800 font-medium text-sm flex items-center gap-1"
                      >
                        View all jobs <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => !isTouchDevice && setActiveDropdown('locations')}
              onMouseLeave={() => !isTouchDevice && setActiveDropdown(null)}
            >
              <button
                className={`px-4 py-2 font-medium flex items-center gap-1 ${useTransparentStyle ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-gray-900'}`}
                onClick={() => isTouchDevice && setActiveDropdown(activeDropdown === 'locations' ? null : 'locations')}
              >
                {navigation.locations.label}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'locations' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'locations' && (
                <div className="absolute top-full left-0 w-[90vw] max-w-[320px] bg-white rounded-xl shadow-xl border border-gray-100 p-4">
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">UK Locations</p>
                  <div className="space-y-1">
                    {navigation.locations.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{item.name}</span>
                        <span className="text-sm text-gray-500">{item.count}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => !isTouchDevice && setActiveDropdown('resources')}
              onMouseLeave={() => !isTouchDevice && setActiveDropdown(null)}
            >
              <button
                className={`px-4 py-2 font-medium flex items-center gap-1 ${useTransparentStyle ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-gray-900'}`}
                onClick={() => isTouchDevice && setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
              >
                {navigation.resources.label}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 w-[90vw] max-w-[500px] bg-white rounded-xl shadow-xl border border-gray-100 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Role Guides</p>
                    <div className="space-y-1">
                      {navigation.resources.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Guides</p>
                    <div className="space-y-1">
                      {navigation.resources.guides.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* For Employers Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => !isTouchDevice && setActiveDropdown('employers')}
              onMouseLeave={() => !isTouchDevice && setActiveDropdown(null)}
            >
              <button
                className={`px-4 py-2 font-medium flex items-center gap-1 ${useTransparentStyle ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-gray-900'}`}
                onClick={() => isTouchDevice && setActiveDropdown(activeDropdown === 'employers' ? null : 'employers')}
              >
                {navigation.employers.label}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'employers' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'employers' && (
                <div className="absolute top-full right-0 w-[90vw] max-w-[400px] bg-white rounded-xl shadow-xl border border-gray-100 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Hire Talent</p>
                    <div className="space-y-1">
                      {navigation.employers.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Services</p>
                    <div className="space-y-1">
                      {navigation.employers.services.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Work Types Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => !isTouchDevice && setActiveDropdown('engagementTypes')}
              onMouseLeave={() => !isTouchDevice && setActiveDropdown(null)}
            >
              <button
                className={`px-4 py-2 font-medium flex items-center gap-1 ${useTransparentStyle ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-gray-900'}`}
                onClick={() => isTouchDevice && setActiveDropdown(activeDropdown === 'engagementTypes' ? null : 'engagementTypes')}
              >
                {navigation.engagementTypes.label}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === 'engagementTypes' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'engagementTypes' && (
                <div className="absolute top-full right-0 w-[90vw] max-w-[600px] bg-white rounded-xl shadow-xl border border-gray-100 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">By Type</p>
                    <div className="space-y-1">
                      {navigation.engagementTypes.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className="text-sm text-gray-500 block">{item.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Featured</p>
                    <div className="space-y-2">
                      {navigation.engagementTypes.featured.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between px-3 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{item.tag}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link
                        href="/interim-jobs-uk"
                        className="text-emerald-700 hover:text-emerald-800 font-medium text-sm flex items-center gap-1"
                      >
                        View all work types <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right side - CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/sign-in"
              className={`hidden sm:block font-medium px-4 py-2 ${useTransparentStyle ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Sign In
            </Link>
            <Link
              href="/fractional-jobs-uk"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${useTransparentStyle ? 'bg-white text-gray-900 hover:bg-white/90' : 'bg-emerald-700 hover:bg-emerald-800 text-white'}`}
            >
              Browse Jobs
            </Link>

            {/* Locale Switcher */}
            <LocaleSwitcher />

            {/* Mobile menu button - 48x48px touch target */}
            <button
              className={`lg:hidden p-3 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-lg transition-colors ${useTransparentStyle ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Backdrop */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 top-16 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-16 left-0 right-0 bg-white border-t border-gray-100 py-4 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-lg">
            <div className="space-y-2">
              {/* Find Jobs */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 min-h-[48px] font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveDropdown(activeDropdown === 'mobile-roles' ? null : 'mobile-roles')}
                >
                  Find Jobs
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${activeDropdown === 'mobile-roles' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-roles' && (
                  <div className="bg-gray-50 py-2">
                    {navigation.roles.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-6 py-3 min-h-[44px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Locations */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 min-h-[48px] font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveDropdown(activeDropdown === 'mobile-locations' ? null : 'mobile-locations')}
                >
                  Locations
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${activeDropdown === 'mobile-locations' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-locations' && (
                  <div className="bg-gray-50 py-2">
                    {navigation.locations.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-6 py-3 min-h-[44px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 min-h-[48px] font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveDropdown(activeDropdown === 'mobile-resources' ? null : 'mobile-resources')}
                >
                  Resources
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${activeDropdown === 'mobile-resources' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-resources' && (
                  <div className="bg-gray-50 py-2">
                    {navigation.resources.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-6 py-3 min-h-[44px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* For Employers */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 min-h-[48px] font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveDropdown(activeDropdown === 'mobile-employers' ? null : 'mobile-employers')}
                >
                  For Employers
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${activeDropdown === 'mobile-employers' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-employers' && (
                  <div className="bg-gray-50 py-2">
                    {navigation.employers.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-6 py-3 min-h-[44px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Work Types */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 min-h-[48px] font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveDropdown(activeDropdown === 'mobile-engagementTypes' ? null : 'mobile-engagementTypes')}
                >
                  Work Types
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${activeDropdown === 'mobile-engagementTypes' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-engagementTypes' && (
                  <div className="bg-gray-50 py-2">
                    {navigation.engagementTypes.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-6 py-3 min-h-[44px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-200 mt-2 pt-2">
                      {navigation.engagementTypes.featured.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-6 py-3 min-h-[44px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sign In (mobile) */}
              <div className="px-4 pt-4 border-t border-gray-100">
                <Link
                  href="/auth/sign-in"
                  className="block text-center py-3 min-h-[48px] text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

// Icons
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
