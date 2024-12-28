'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { useNotifications } from '@/components/notifications-provider'
import ProgressBar from '@/components/ProgressBar'

interface Course {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: number
  progress: number
}

export default function LearningPathManager() {
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<Course[]>([])
  const { user } = useAuth()
  const { addNotification } = useNotifications()

  useEffect(() => {
    if (user) {
      fetchCourses()
      fetchLearningPath()
      fetchRecommendations()
    }
  }, [user])

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses')
      if (!res.ok) throw new Error('Failed to fetch courses')
      const data = await res.json()
      setCourses(data)
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to load courses. Please try again.' })
    }
  }

  const fetchLearningPath = async () => {
    try {
      const res = await fetch('/api/users/learning-path')
      if (!res.ok) throw new Error('Failed to fetch learning path')
      const data = await res.json()
      setSelectedCourses(data.courses.map((course: Course) => course.id))
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to load learning path. Please try again.' })
    }
  }

  const fetchRecommendations = async () => {
    try {
      const res = await fetch('/api/users/recommendations')
      if (!res.ok) throw new Error('Failed to fetch recommendations')
      const data = await res.json()
      setRecommendations(data)
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to load recommendations. Please try again.' })
    }
  }

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/users/learning-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseIds: selectedCourses }),
      })

      if (!res.ok) throw new Error('Failed to update learning path')

      addNotification({ type: 'success', message: 'Learning path updated successfully!' })
      fetchRecommendations()
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to update learning path. Please try again.' })
    }
  }

  if (!user) {
    return <div>Please log in to manage your learning path.</div>
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Learning Path</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id={`course-${course.id}`}
                  checked={selectedCourses.includes(course.id)}
                  onChange={() => handleCourseToggle(course.id)}
                  className="mr-2"
                />
                <label htmlFor={`course-${course.id}`} className="text-lg font-semibold">{course.title}</label>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{course.description}</p>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>Difficulty: {course.difficulty}</span>
                <span>Duration: {course.duration} hours</span>
              </div>
              <ProgressBar progress={course.progress} />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Learning Path
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Recommended Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map(course => (
          <div key={course.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{course.description}</p>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Difficulty: {course.difficulty}</span>
              <span>Duration: {course.duration} hours</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

