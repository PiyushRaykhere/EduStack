import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config/api'

export default function Courses() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    let navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        setIsLoggedIn(Boolean(storedUser))

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/courses`)
                console.log(response.data)  // log the received data in the console.
                setCourses(response.data.data) // Access the data array from the response
                setLoading(false)
            } catch (error) {
                console.error(error)
                setError("Failed to fetch courses. Please try again later.")
                setLoading(false)
            }
        }
        
        fetchData()
    }, [])

    if (loading) return <div className="text-center p-5">Loading courses...</div>
    if (error) return <div className="text-center p-5 text-red-500">{error}</div>

    return (
        <div className="container mx-auto p-4">
            <center>
                <h1 className="text-3xl font-bold mb-8">Courses</h1>
            </center>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <div key={course._id} className="border rounded-lg overflow-hidden shadow-lg">
                        <img 
                            src={course.poster} 
                            alt={course.name} 
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/300x200?text=Course+Image"
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
                                    ₹{course.price.toLocaleString()}
                                </span>
                            </div>
                            <button onClick={()=>{
                                if (!isLoggedIn) {
                                    navigate('/login')
                                    return
                                }
                                navigate(`/courses/enroll/${course._id}`)
                            }}  className={`w-full mt-4 text-white font-medium py-2 px-4 rounded ${
                                isLoggedIn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 hover:bg-gray-500'
                            }`}>
                                Enroll Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {courses.length === 0 && (
                <div className="text-center p-10 text-gray-500">
                    No courses available at the moment.
                </div>
            )}
        </div>
    )
}
