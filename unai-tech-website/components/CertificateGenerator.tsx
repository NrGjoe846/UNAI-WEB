'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { useNotifications } from '@/components/notifications-provider'

export default function CertificateGenerator() {
  const [completedCourses, setCompletedCourses] = useState([])
  const { user } = useAuth()
  const { addNotification } = useNotifications()

  useEffect(() => {
    if (user) {
      fetchCompletedCourses()
    }
  }, [user])

  const fetchCompletedCourses = async () => {
    try {
      const res = await fetch('/api/users/completed-courses')
      if (!res.ok) throw new Error('Failed to fetch completed courses')
      const data = await res.json()
      setCompletedCourses(data)
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to load completed courses. Please try again.' })
    }
  }

  const generateCertificate = async (courseId) => {
    try {
      const res = await fetch('/api/certificates/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      })

      if (!res.ok) throw new Error('Failed to generate certificate')

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `certificate-${courseId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      addNotification({ type: 'success', message: 'Certificate generated successfully!' })
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to generate certificate. Please try again.' })
    }
  }

  if (!user) {
    return <div>Please log in to view your certificates.</div>
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Certificates</h1>
      {completedCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedCourses.map(course => (
            <div key={course.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Completed on: {new Date(course.completedAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => generateCertificate(course.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Generate Certificate
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't completed any courses yet. Keep learning to earn certificates!</p>
      )}
    </div>
  )
}

