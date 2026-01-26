'use client'

import { useState, useEffect } from 'react'

interface TOCItem {
  id: string
  title: string
  level?: 2 | 3
}

interface TableOfContentsProps {
  items: TOCItem[]
  title?: string
}

export function TableOfContents({ items, title = 'On This Page' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      // Update URL without scroll
      window.history.pushState({}, '', `#${id}`)
    }
  }

  return (
    <nav className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm" aria-label="Table of contents">
      <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block text-sm transition-colors py-1 border-l-2 pl-3 ${
                item.level === 3 ? 'ml-3' : ''
              } ${
                activeId === item.id
                  ? 'border-emerald-500 text-emerald-700 font-medium'
                  : 'border-transparent text-gray-600 hover:text-emerald-700 hover:border-emerald-300'
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Mobile-friendly dropdown version
export function TableOfContentsMobile({ items, title = 'Jump to Section' }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsOpen(false)
  }

  return (
    <div className="lg:hidden bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-gray-900 font-medium"
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul className="mt-4 space-y-2 border-t border-gray-100 pt-4">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`block text-sm text-left w-full py-1.5 px-3 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors ${
                  item.level === 3 ? 'ml-3' : ''
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
