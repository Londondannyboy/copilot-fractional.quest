'use client'

import { useState } from 'react'

interface EmailCaptureProps {
  variant?: 'inline' | 'sidebar' | 'banner'
  title?: string
  description?: string
  buttonText?: string
  className?: string
}

export function EmailCapture({
  variant = 'inline',
  title = 'Get Job Alerts',
  description = 'Be the first to know about new fractional executive opportunities.',
  buttonText = 'Subscribe',
  className = ''
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    // Simulate API call - replace with actual newsletter signup
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setMessage('Thanks! You\'ll receive job alerts soon.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📬</span>
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        <p className="text-indigo-100 text-sm mb-4">{description}</p>

        {status === 'success' ? (
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <span className="text-green-200">✓</span> {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <label htmlFor="email-sidebar" className="sr-only">Email address</label>
            <input
              id="email-sidebar"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
              aria-label="Email address for job alerts"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-white text-indigo-700 font-semibold py-2.5 rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : buttonText}
            </button>
          </form>
        )}

        <p className="text-xs text-indigo-200 mt-3">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    )
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-indigo-600 py-4 px-6 ${className}`}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white text-center md:text-left">
            <span className="font-semibold">{title}</span>
            <span className="hidden md:inline text-indigo-200 ml-2">{description}</span>
          </div>

          {status === 'success' ? (
            <span className="text-green-200">✓ {message}</span>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
              <label htmlFor="email-banner" className="sr-only">Email address</label>
              <input
                id="email-banner"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
                aria-label="Email address for job alerts"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? '...' : buttonText}
              </button>
            </form>
          )}
        </div>
      </div>
    )
  }

  // Default: inline variant
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-xl p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">📬</span>
        <h3 className="font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm">
          ✓ {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor="email-inline" className="sr-only">Email address</label>
          <input
            id="email-inline"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
            aria-label="Email address for job alerts"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? '...' : buttonText}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-red-600 text-sm mt-2">{message}</p>
      )}
    </div>
  )
}
