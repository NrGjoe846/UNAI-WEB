'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { useNotifications } from '@/components/notifications-provider'
import ProgressBar from '@/components/progress-bar'
import CourseEnrollment from '@/components/course-enrollment'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function CoursePage() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [progress, setProgress] = useState(0)
  const [completedLessons, setCompletedLessons] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const { addNotification } = useNotifications()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await fetchCourseDetails()
        if (user) {
          await fetchUserProgress()
        }
      } catch (err) {
        setError('Failed to load course data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id, user])

  const fetchCourseDetails = async () => {
    const res = await fetch(`/api/courses/${id}`)
    if (!res.ok) throw new Error('Failed to fetch course details')
    const data = await res.json()
    setCourse(data)
  }

  const fetchUserProgress = async () => {
    const res = await fetch(`/api/courses/${id}/progress`)
    if (!res.ok) throw new Error('Failed to fetch user progress')
    const data = await res.json()
    setProgress(data.progress)
    setCompletedLessons(data.completedLessons)
  }

  const markLessonComplete = async (lessonId: string) => {
    try {
      const res = await fetch(`/api/courses/${id}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId }),
      })

      if (!res.ok) throw new Error('Failed to update progress')

      const data = await res.json()
      setProgress(data.progress)
      setCompletedLessons(data.completedLessons)
      addNotification({ type: 'success', message: 'Progress updated successfully!' })
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to update progress. Please try again.' })
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-red-500">{error}</div>
  if (!course) return <div>Course not found</div>

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{course.description}</p>
      
      {user ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
          <ProgressBar progress={progress} />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{progress}% complete</p>
        </div>
      ) : (
        <CourseEnrollment course={course} />
      )}

      <div className="space-y-6">
        {course.lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{lesson.description}</p>
            {user && (
              <button
                onClick={() => markLessonComplete(lesson.id)}
                className={`px-4 py-2 rounded-full ${
                  completedLessons.includes(lesson.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                disabled={completedLessons.includes(lesson.id)}
              >
                {completedLessons.includes(lesson.id) ? 'Completed' : 'Mark as Complete'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

