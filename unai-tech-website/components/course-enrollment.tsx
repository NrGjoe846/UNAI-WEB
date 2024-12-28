'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { useNotifications } from '@/components/notifications-provider'

interface Course {
  id: string
  title: string
  price: number
}

export default function CourseEnrollment({ course }: { course: Course }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { addNotification } = useNotifications()

  const handleEnrollment = async () => {
    if (!user) {
      addNotification({ type: 'error', message: 'Please log in to enroll in courses.' })
      router.push('/login')
      return
    }

    setIsLoading(true)

    try {
      // For now, we'll just simulate a successful enrollment
      await new Promise(resolve => setTimeout(resolve, 1000))
      addNotification({ type: 'success', message: 'Successfully enrolled in the course!' })
      router.push(`/courses/${course.id}`)
    } catch (error) {
      console.error('Enrollment error:', error)
      addNotification({ type: 'error', message: 'Failed to process enrollment. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-6">
      <button
        onClick={handleEnrollment}
        disabled={isLoading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : `Enroll Now - $${course.price}`}
      </button>
    </div>
  )
}

