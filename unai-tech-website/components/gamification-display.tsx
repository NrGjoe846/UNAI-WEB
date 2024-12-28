'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { useNotifications } from '@/components/notifications-provider'

export default function GamificationDisplay() {
  const [points, setPoints] = useState(0)
  const [achievements, setAchievements] = useState([])
  const { user } = useAuth()
  const { addNotification } = useNotifications()

  useEffect(() => {
    if (user) {
      fetchGamificationData()
    }
  }, [user])

  const fetchGamificationData = async () => {
    try {
      const res = await fetch('/api/users/gamification')
      if (!res.ok) throw new Error('Failed to fetch gamification data')
      const data = await res.json()
      setPoints(data.points)
      setAchievements(data.achievements)
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to load gamification data. Please try again.' })
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      <div className="mb-4">
        <p className="text-lg">Points: <span className="font-bold text-blue-600">{points}</span></p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Achievements</h3>
        {achievements.length > 0 ? (
          <ul className="space-y-2">
            {achievements.map(achievement => (
              <li key={achievement.id} className="flex items-center">
                <svg className="w-6 h-6 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {achievement.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No achievements yet. Keep learning to earn some!</p>
        )}
      </div>
    </div>
  )
}

