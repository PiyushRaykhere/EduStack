import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config/api'
import { formatDuration } from '../utils/formatDuration'
import { BookOpen, CheckCircle2, ChevronRight, Loader2, ArrowRight } from 'lucide-react'

const PLACEHOLDER_IMG = 'https://placehold.co/600x400?text=Course+Image'

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
      <div className="w-full h-48 bg-slate-200 animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-slate-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-slate-100 rounded animate-pulse w-full" />
        <div className="h-4 bg-slate-100 rounded animate-pulse w-2/3" />
        <div className="flex justify-between pt-2">
          <div className="h-6 bg-slate-200 rounded animate-pulse w-20" />
          <div className="h-9 bg-indigo-100 rounded-lg animate-pulse w-28" />
        </div>
      </div>
    </div>
  )
}

export default function MyCourses() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [completedCourses, setCompletedCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [errorDetail, setErrorDetail] = useState(null)

  const fetchEnrollments = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please log in first to see your enrolled courses.')
        setErrorDetail('login')
        setLoading(false)
        return
      }

      const response = await axios.get(`${API_URL}/enroll/getEnrolls`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const enrolledCourses = (response.data || [])
        .map((item) => item.courseId)
        .filter(Boolean)

      setCourses(enrolledCourses)
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load enrolled courses. Please try again later.')
      setErrorDetail(err.response?.status === 401 ? 'login' : 'generic')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEnrollments()
  }, [fetchEnrollments])

  const handleComplete = (courseId) => {
    setCompletedCourses((prev) =>
      prev.includes(courseId) ? prev : [...prev, courseId]
    )
  }

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
            <Loader2 size={24} className="text-indigo-600 animate-spin" />
          </div>
          <p className="text-slate-600 font-medium">Loading your courses…</p>
        </div>
      </div>
    )
  }

  // ─── Error ────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-slate-100 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
          <p className="text-slate-500 mb-8">{error}</p>
          <div className="flex flex-col gap-3">
            {errorDetail === 'login' ? (
              <button
                onClick={() => navigate('/login')}
                className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                Log In
              </button>
            ) : (
              <button
                onClick={fetchEnrollments}
                className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
            )}
            <button
              onClick={() => navigate('/courses')}
              className="w-full px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Empty state ──────────────────────────────────────────────────────────
  if (courses.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-slate-100 text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-5">
            <BookOpen size={28} className="text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No courses yet</h2>
          <p className="text-slate-500 mb-8">
            You haven't enrolled in any courses. Start learning today!
          </p>
          <button
            onClick={() => navigate('/courses')}
            className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center justify-center gap-2"
          >
            Browse Courses
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  // ─── Main grid ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Dashboard
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">My Courses</h1>
          <p className="text-slate-600">
            {courses.length} course{courses.length !== 1 ? 's' : ''} enrolled · {completedCourses.length} completed
          </p>
        </div>
      </div>

      {/* Course grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {courses.map((course) => {
            const isDone = completedCourses.includes(course._id)
            return (
              <div
                key={course._id}
                className={`group bg-white rounded-2xl overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isDone ? 'border-emerald-200' : 'border-slate-100'
                }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={course.poster}
                    alt={course.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = PLACEHOLDER_IMG }}
                  />
                  {isDone && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold inline-flex items-center gap-1">
                      <CheckCircle2 size={14} />
                      Completed
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold uppercase tracking-wide">
                      {course.level || 'Course'}
                    </span>
                    <span className="text-xs text-slate-400">{formatDuration(course.duration)}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {course.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">{course.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xl font-bold text-slate-900">₹{course.price?.toLocaleString?.() ?? course.price}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
                      Learn <ChevronRight size={14} />
                    </span>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => navigate(`/courses/enroll/${course._id}`)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors"
                    >
                      {isDone ? 'Review' : 'Continue Learning'}
                    </button>
                    {!isDone && (
                      <button
                        onClick={() => handleComplete(course._id)}
                        className="flex-1 border-2 border-slate-200 text-slate-700 font-medium py-2.5 px-4 rounded-xl hover:border-emerald-400 hover:text-emerald-700 transition-colors"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
