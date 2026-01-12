'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const CALENDLY_URL = 'https://calendly.com/firstquest/quest'

export default function BookCallPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: 'candidate',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', userType: 'candidate', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero with Dan's photo */}
      <section className="bg-gradient-to-br from-orange-500 via-rose-500 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Image
            src="/dan-keegan.webp"
            alt="Dan Keegan - Founder of Fractional Quest"
            width={120}
            height={120}
            className="rounded-full border-4 border-white/30 shadow-2xl object-cover mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold mb-3">Book a Free Call</h1>
          <p className="text-xl text-white/90 mb-2">
            30 minutes with <strong>Dan Keegan</strong>
          </p>
          <p className="text-white/70 max-w-xl mx-auto">
            Fractional Executive & Founder with 15+ years helping executives build portfolio careers
          </p>
        </div>
      </section>

      {/* Main CTA - Book Now Button */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200 text-center">
            <div className="text-5xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Schedule Your Call</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Pick a time that works for you. The call is free, with no commitment required.
            </p>

            {/* Big prominent button - opens Calendly in new tab */}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-bold py-4 px-8 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Open Calendar</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <p className="text-sm text-gray-500 mt-4">
              Opens Calendly in a new tab • Free • 30 min • Zoom
            </p>

            {/* What to expect */}
            <div className="grid md:grid-cols-3 gap-4 mt-8 text-left">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-2xl mb-2">1️⃣</div>
                <p className="text-sm text-gray-600">Choose a date and time</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-2xl mb-2">2️⃣</div>
                <p className="text-sm text-gray-600">Add your details</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="text-2xl mb-2">3️⃣</div>
                <p className="text-sm text-gray-600">Get Zoom link instantly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm font-medium">OR SEND A MESSAGE</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      </div>

      {/* Alternative: Contact Form */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Send a Message</h2>
              <p className="text-gray-600 text-sm mb-6">
                Prefer email? I&apos;ll respond within 24 hours.
              </p>

              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-4">
                    Thanks! I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      I am a...
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="userType"
                          value="candidate"
                          checked={formData.userType === 'candidate'}
                          onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                          className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">Candidate</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="userType"
                          value="employer"
                          checked={formData.userType === 'employer'}
                          onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                          className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">Employer</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Tell me about your situation..."
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Context Cards */}
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🎯</span> For Employers
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Discuss your fractional hiring needs</li>
                  <li>• Get matched with vetted executives</li>
                  <li>• Understand pricing models</li>
                  <li>• No commitment required</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>💼</span> For Candidates
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Explore fractional opportunities</li>
                  <li>• Career guidance and advice</li>
                  <li>• Market rate positioning</li>
                  <li>• Personalized recommendations</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Direct contact</h3>
                <div className="space-y-2">
                  <a
                    href="mailto:dan@fractional.quest"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    dan@fractional.quest
                  </a>
                  <a
                    href="https://linkedin.com/in/dankeegan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link
            href="/fractional-jobs-uk"
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Back to Jobs
          </Link>
        </div>
      </section>
    </main>
  )
}
