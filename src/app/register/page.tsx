'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedinUrl: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateLinkedIn = (url: string) => {
    const re = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
    return re.test(url)
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.linkedinUrl.trim()) {
      newErrors.linkedinUrl = 'LinkedIn profile URL is required'
    } else if (!validateLinkedIn(formData.linkedinUrl)) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourname)'
    }

    if (!formData.consent) {
      newErrors.consent = 'You must consent to continue'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      router.push('/register/thank-you')
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-2xl mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-white hover:text-emerald-400 transition-colors">
            Fractional Quest
          </Link>
          <div className="inline-block bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold mt-4">
            Beta Launching Q1 2026
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Register Your Interest
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Join our waitlist to be notified when we launch in Q1 2026 or if we find a suitable fractional role for you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 bg-gray-900 border ${
                  errors.name ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors`}
                placeholder="John Smith"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 bg-gray-900 border ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* LinkedIn URL */}
            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-300 mb-2">
                LinkedIn Profile URL <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                id="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className={`w-full px-4 py-3 bg-gray-900 border ${
                  errors.linkedinUrl ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors`}
                placeholder="https://linkedin.com/in/yourname"
              />
              {errors.linkedinUrl && <p className="mt-1 text-sm text-red-400">{errors.linkedinUrl}</p>}
              <p className="mt-1 text-sm text-gray-500">
                We'll analyze your public LinkedIn profile to match you with suitable roles
              </p>
            </div>

            {/* Consent */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 h-4 w-4 text-emerald-600 bg-gray-800 border-gray-600 rounded focus:ring-emerald-500 focus:ring-offset-gray-900"
                />
                <label htmlFor="consent" className="ml-3 text-sm text-gray-300">
                  I consent to Fractional Quest analyzing my public LinkedIn profile to build my professional profile and contacting me about suitable fractional executive roles or when the platform launches in Q1 2026. <span className="text-red-400">*</span>
                </label>
              </div>
              {errors.consent && <p className="mt-2 text-sm text-red-400">{errors.consent}</p>}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                <p className="text-sm text-red-400">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-colors text-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already registered?{' '}
            <Link href="/fractional-jobs-uk" className="text-emerald-400 hover:text-emerald-300">
              Browse our job content
            </Link>
          </p>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
