import React, { useState } from 'react'
import axios from 'axios'
import API_URL from '../config/api'
import { useNavigate } from 'react-router-dom'

export default function Doubt() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const isLoggedIn = Boolean(localStorage.getItem('user'))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isLoggedIn) {
      setError('Please log in first to use the doubt assistant.')
      return
    }

    if (!query.trim()) {
      setError('Please enter your doubt first.')
      return
    }

    setLoading(true)
    setSubmitted(false)
    setAnswer('')
    setError('')

    try {
      const response = await axios.post(`${API_URL}/doubt/ask`, {
        query: query.trim()
      })
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
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <div className="max-w-4xl w-full mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-sm font-medium">
            AI Study Assistant
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
            Ask your doubt
          </h1>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Type any learning question and get a simple AI-generated answer.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm min-h-[420px] p-4 sm:p-6 flex flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto">
            {!isLoggedIn && (
              <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-800 shadow-sm">
                Please log in to ask doubts with the AI assistant. This page is disabled until you sign in.
              </div>
            )}

            {!submitted && !loading && !error && !answer && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-xl">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold">
                    G
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800 mt-4">Start a new conversation</h2>
                  <p className="text-slate-500 mt-2">
                    Ask about courses, coding concepts, assignments, or anything you are stuck on.
                  </p>
                </div>
              </div>
            )}

            {submitted && (
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-3xl rounded-br-md bg-slate-900 text-white px-5 py-4 shadow-sm">
                  <p className="whitespace-pre-line">{query}</p>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-3xl rounded-bl-md bg-emerald-50 border border-emerald-100 px-5 py-4 text-slate-700 shadow-sm">
                  AI is thinking...
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-3xl rounded-bl-md bg-red-50 border border-red-100 px-5 py-4 text-red-700 shadow-sm">
                  {error}
                </div>
              </div>
            )}

            {answer && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-3xl rounded-bl-md bg-emerald-50 border border-emerald-100 px-5 py-4 shadow-sm">
                  <div className="text-sm font-semibold text-emerald-700 mb-2">Gemini</div>
                  <p className="text-slate-700 whitespace-pre-line">{answer}</p>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 pt-4 border-t border-slate-200">
            <div className="rounded-3xl border border-slate-300 bg-slate-50 p-3 shadow-sm">
              <textarea
                id="query"
                name="query"
                rows="3"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask AI anything about your learning..."
                disabled={!isLoggedIn || loading}
                className="w-full resize-none bg-transparent px-2 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              />
              <div className="flex justify-between items-center mt-2 gap-4">
                <p className="text-xs text-slate-400">AI responses may make mistakes. Verify important answers.</p>
                <div className="flex items-center gap-3">
                  {!isLoggedIn && (
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="rounded-2xl px-5 py-2.5 text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-100"
                    >
                      Go to Login
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!isLoggedIn || loading}
                    className={`rounded-2xl px-5 py-2.5 text-sm font-medium text-white ${
                      !isLoggedIn || loading
                        ? 'bg-emerald-300 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    {loading ? 'Sending...' : 'Ask AI'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
