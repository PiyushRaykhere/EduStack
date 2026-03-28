import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function MyCourses() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [completedCourses, setCompletedCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const storedUser = localStorage.getItem('user')

        if (!storedUser) {
          setError('Please log in first to see your enrolled courses.')
          setLoading(false)
          return
        }

        const parsedUser = JSON.parse(storedUser)
        const userId = parsedUser?._id

        if (!userId) {
          setError('User information is missing. Please log in again.')
          setLoading(false)
          return
        }

        const response = await axios.get(`http://localhost:5500/api/enroll/getEnrolls/${userId}`)
        const enrolledCourses = response.data.map((item) => item.courseId).filter(Boolean)

        setCourses(enrolledCourses)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError('Failed to load enrolled courses. Please try again later.')
        setLoading(false)
      }
    }

    fetchEnrollments()
  }, [])

  if (loading) {
    return <div className="text-center p-5">Loading your courses...</div>
  }

  if (error) {
    return <div className="text-center p-5 text-red-500">{error}</div>
  }

  const handleComplete = (courseId) => {
    setCompletedCourses((prev) =>
      prev.includes(courseId) ? prev : [...prev, courseId]
    )
  }

  return (
    <div className="container mx-auto p-4">
      <center>
        <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      </center>

      {courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">You have not enrolled in any courses yet.</p>
          <button
            onClick={() => navigate('/courses')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="border rounded-lg overflow-hidden shadow-lg bg-white">
              <img
                src={course.poster}
                alt={course.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Course+Image'
                }}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
                <p className="text-gray-700 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {course.duration} hours
                  </span>
                  <span className="font-bold text-lg">
                    Rs. {course.price?.toLocaleString?.() ?? course.price}
                  </span>
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => navigate(`/courses/enroll/${course._id}`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                  >
                    Learn
                  </button>
                  <button
                    onClick={() => handleComplete(course._id)}
                    disabled={completedCourses.includes(course._id)}
                    className={`flex-1 font-medium py-2 px-4 rounded ${
                      completedCourses.includes(course._id)
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                  >
                    {completedCourses.includes(course._id) ? 'Completed' : 'Complete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
