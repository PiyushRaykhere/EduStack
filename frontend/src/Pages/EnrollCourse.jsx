import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../config/api'
import { formatDuration } from '../utils/formatDuration'
import {
  CheckCircle2, Clock, User, BarChart3, ChevronDown,
  ChevronRight, ArrowLeft, Loader2, ShieldCheck
} from 'lucide-react'

const PLACEHOLDER_IMG = 'https://placehold.co/800x500?text=Course+Image'

export default function EnrollCourse() {
  let { cid } = useParams()
  const navigate = useNavigate()

  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [enrolling, setEnrolling] = useState(false)
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false)
  const [expandedSections, setExpandedSections] = useState({})
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    if (!API_URL) {
      setError('API configuration is missing. Please contact support.')
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/courses/${cid}`)
        setCourseData(response.data.data)
        setLoading(false)
      } catch (error) {
        setError("Failed to fetch course details. Please try again later.")
        setLoading(false)
      }
    }

    fetchData()
  }, [cid, retryKey])

  const handleEnrollment = async () => {
    setEnrolling(true)
    setError(null)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError("Please log in first to enroll in this course.")
        setEnrolling(false)
        return
      }

      await axios.post(
        `${API_URL}/enroll/addNewEnroll`,
        { courseId: cid },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setEnrollmentSuccess(true)
      setEnrolling(false)
    } catch (error) {
      setError(error.response?.data?.message || "Failed to enroll. Please try again later.")
      setEnrolling(false)
    }
  }

  const toggleSection = (idx) => {
    setExpandedSections((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
            <Loader2 size={24} className="text-indigo-600 animate-spin" />
          </div>
          <p className="text-slate-600 font-medium">Loading course details…</p>
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
            <button
              onClick={() => setRetryKey((k) => k + 1)}
              className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="w-full px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Success ──────────────────────────────────────────────────────────────
  if (enrollmentSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-slate-100 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={28} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Enrollment Successful!</h2>
          <p className="text-slate-500 mb-8">
            You're now enrolled in <span className="font-semibold text-slate-700">{courseData?.name}</span>. Happy learning!
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/my-courses')}
              className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Go to My Courses
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="w-full px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
            >
              Browse More Courses
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Main Course View ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero banner with poster */}
      <div className="relative h-64 sm:h-80 md:h-96">
        <img
          src={courseData?.poster || PLACEHOLDER_IMG}
          alt={courseData?.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = PLACEHOLDER_IMG }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/20" />

        {/* Back button */}
        <button
          onClick={() => navigate('/courses')}
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Course title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-5xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-xs font-semibold text-indigo-100 mb-3">
              {courseData?.category || 'Course'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {courseData?.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left: Course info */}
            <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10">
              {/* Meta pills */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <BarChart3 size={13} className="text-slate-500" />
                  {courseData?.level || 'All Levels'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <Clock size={13} className="text-slate-500" />
                  {formatDuration(courseData?.duration)}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <User size={13} className="text-slate-500" />
                  {courseData?.instructor || 'Expert Instructor'}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">About this course</h2>
                <p className="text-slate-600 leading-relaxed">{courseData?.description}</p>
              </div>

              {/* Curriculum */}
              {courseData?.curriculum && courseData.curriculum.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Course Curriculum</h2>
                  <div className="space-y-3">
                    {courseData.curriculum.map((section, idx) => {
                      const isOpen = expandedSections[idx]
                      const lectureCount = section.lectures?.length || 0
                      return (
                        <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden">
                          <button
                            onClick={() => toggleSection(idx)}
                            className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                          >
                            <div>
                              <h3 className="font-semibold text-slate-900 text-sm">{section.title}</h3>
                              <p className="text-xs text-slate-500 mt-0.5">{lectureCount} lecture{lectureCount !== 1 ? 's' : ''}</p>
                            </div>
                            {isOpen ? (
                              <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />
                            ) : (
                              <ChevronRight size={18} className="text-slate-400 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="border-t border-slate-100 divide-y divide-slate-100">
                              {section.lectures?.map((lecture, lidx) => (
                                <div key={lidx} className="px-5 py-3 flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                                      {lidx + 1}
                                    </span>
                                    <span className="text-sm text-slate-700">{lecture.title}</span>
                                  </div>
                                  <span className="text-xs text-slate-400 flex items-center gap-1 flex-shrink-0">
                                    <Clock size={12} />
                                    {lecture.duration}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sticky enrollment card */}
            <div className="lg:col-span-1 bg-slate-50 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-slate-100">
              <div className="lg:sticky lg:top-8">
                {/* Price block */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-4xl font-bold text-slate-900">
                      ₹{courseData?.price?.toLocaleString() || '0'}
                    </span>
                    {courseData?.originalPrice && (
                      <span className="text-lg text-slate-400 line-through">
                        ₹{courseData.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {courseData?.originalPrice && (
                    <span className="inline-block px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold">
                      Save {Math.round(((courseData.originalPrice - courseData.price) / courseData.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Trust badges */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2.5 text-sm text-slate-600">
                    <ShieldCheck size={16} className="text-indigo-500" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="text-indigo-500" />
                    <span>Lifetime access to materials</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-600">
                    <Clock size={16} className="text-indigo-500" />
                    <span>Certificate of completion</span>
                  </div>
                </div>

                {/* Enroll button */}
                <button
                  onClick={handleEnrollment}
                  disabled={enrolling}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                    enrolling
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl'
                  }`}
                >
                  {enrolling ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      Enroll Now
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-400 text-center mt-4">
                  Secure enrollment · Instant access
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
