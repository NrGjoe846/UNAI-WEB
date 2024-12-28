'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { useNotifications } from '@/components/notifications-provider'

interface Webinar {
  id: string
  topic: string
  startTime: string
  duration: number
  zoomJoinUrl: string
}

export default function WebinarScheduler() {
  const [topic, setTopic] = useState('')
  const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState(60)
  const [webinars, setWebinars] = useState<Webinar[]>([])
  const { user } = useAuth()
  const { addNotification } = useNotifications()

  useEffect(() => {
    fetchWebinars()
  }, [])

  const fetchWebinars = async () => {
    try {
      const res = await fetch('/api/webinars')
      if (!res.ok) throw new Error('Failed to fetch webinars')
      const data = await res.json()
      setWebinars(data)
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to load webinars. Please try again.' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/webinars/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, start_time: startTime, duration }),
      })

      if (!res.ok) throw new Error('Failed to create webinar')

      const webinar = await res.json()
      addNotification({ type: 'success', message: 'Webinar scheduled successfully!' })
      setTopic('')
      setStartTime('')
      setDuration(60)
      fetchWebinars()
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to schedule webinar. Please try again.' })
    }
  }

  if (!user || !user.isInstructor) {
    return null
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Schedule a Webinar</h2>
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Topic</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration (minutes)</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            required
            min="15"
            max="240"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Schedule Webinar
        </button>
      </form>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Upcoming Webinars</h2>
        {webinars.length > 0 ? (
          <ul className="space-y-4">
            {webinars.map((webinar) => (
              <li key={webinar.id} className="border-b pb-4 last:border-b-0">
                <h3 className="text-lg font-semibold">{webinar.topic}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(webinar.startTime).toLocaleString()} - Duration: {webinar.duration} minutes
                </p>
                <a
                  href={webinar.zoomJoinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Join Webinar
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming webinars scheduled.</p>
        )}
      </div>
    </div>
  )
}

