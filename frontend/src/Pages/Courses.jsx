import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../config/api'
import { formatDuration } from '../utils/formatDuration'
import useScrollReveal from '../hooks/useScrollReveal'
import { Search, SlidersHorizontal, ChevronRight, BookOpen } from 'lucide-react'

const PLACEHOLDER_IMG = 'https://placehold.co/600x400?text=Course+Image'

const LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']
const CATEGORIES = ['All', 'General', 'Web Development', 'Data Science', 'AI / ML', 'Mobile', 'DevOps']

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
          <div className="h-9 bg-slate-200 rounded-lg animate-pulse w-28" />
        </div>
      </div>
    </div>
  )
}

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('All Levels')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const navigate = useNavigate()
  const coursesRef = useScrollReveal()

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await axios.get(`${API_URL}/courses`)
      setCourses(data.data || [])
    } catch {
      setError('Failed to fetch courses. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const filtered = courses.filter((course) => {
    const matchesSearch =
      !search ||
      course.name?.toLowerCase().includes(search.toLowerCase()) ||
      course.description?.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(search.toLowerCase())
    const matchesLevel = levelFilter === 'All Levels' || course.level === levelFilter
    const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter
    return matchesSearch && matchesLevel && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
                Catalog
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Browse Courses</h1>
              <p className="text-slate-600">
                {courses.length} course{courses.length !== 1 ? 's' : ''} available
              </p>
            </div>

            {/* Search + filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses, instructors…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-72 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters((v) => !v)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>
          </div>

          {/* Filter chips */}
          {showFilters && (
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-medium text-slate-500 self-center mr-1">Level:</span>
                {LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={() => setLevelFilter(level)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      levelFilter === level
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block" />
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-medium text-slate-500 self-center mr-1">Category:</span>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      categoryFilter === cat
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Course grid */}
      <div ref={coursesRef} className="reveal-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {error && (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchData}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!error && filtered.length === 0 && !loading && (
          <div className="text-center py-16">
            <BookOpen size={40} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No courses match your filters.</p>
            <button
              onClick={() => { setSearch(''); setLevelFilter('All Levels'); setCategoryFilter('All') }}
              className="mt-4 text-indigo-600 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((course) => (
              <div
                key={course._id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link to={`/courses/enroll/${course._id}`} className="block">
                  <div className="relative overflow-hidden">
                    <img
                      src={course.poster}
                      alt={course.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = PLACEHOLDER_IMG }}
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700">
                      {course.category}
                    </span>
                    {course.originalPrice && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold uppercase tracking-wide">
                        {course.level}
                      </span>
                      <span className="text-xs text-slate-400">{formatDuration(course.duration)}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {course.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-1 line-clamp-2 leading-relaxed">{course.description}</p>
                    <p className="text-xs text-slate-400 mb-4">by {course.instructor || 'Expert Instructor'}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-slate-900">₹{course.price.toLocaleString()}</span>
                        {course.originalPrice && (
                          <span className="text-sm text-slate-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
                        Enroll <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
