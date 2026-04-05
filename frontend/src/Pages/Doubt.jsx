import React, { useState } from 'react'
import axios from 'axios'
import API_URL from '../config/api'

export default function Doubt() {
  const [formData, setFormData] = useState({
    email: '',
    query: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSubmitted(false)
    setAnswer('')
    setError('')

    try {
      const response = await axios.post(`${API_URL}/doubt/ask`, formData)
      setAnswer(response.data.answer)
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Failed to get answer from Gemini. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-xl md:text-2xl font-bold text-white">Ask a Doubt</h1>
            <p className="text-blue-100 mt-1">Ask you Question and wait , we will get back to you soon </p>
          </div>

          <div className="p-6">
            <p className="text-gray-600 mb-6">
              Use this placeholder form to submit a question.            </p>

            {submitted && (
              <div className="bg-green-100 border border-green-200 text-green-700 rounded-lg p-4 mb-6">
                Gemini has generated an answer for your doubt.
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Query
                </label>
                <textarea
                  id="query"
                  name="query"
                  rows="6"
                  required
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="Describe your doubt here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Getting Answer...' : 'Submit Doubt'}
              </button>
            </form>

            {answer && (
              <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-5">
                <h2 className="text-lg font-semibold text-blue-800 mb-3">Gemini Answer</h2>
                <p className="text-gray-700 whitespace-pre-line">{answer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
