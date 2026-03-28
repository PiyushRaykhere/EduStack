import React from 'react'

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-xl md:text-2xl font-bold text-white">Contact Us</h1>
            <p className="text-blue-100 mt-1">This is a dummy contact page for now</p>
          </div>

          <div className="p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Get in Touch</h2>
              <p className="text-gray-600">
                If you need help with courses, enrollments, or your account, you can
                reach out to our support team. This page is currently a placeholder.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600">support@upskillx.dev</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Office Hours</h3>
              <p className="text-blue-700">Monday to Friday, 9:00 AM to 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
