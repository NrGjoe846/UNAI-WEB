"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FuturisticCard } from '@/components/ui/FuturisticCard'
import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa'

type LeaderboardEntry = {
  id: number
  name: string
  xp: number
  level: number
  avatar: string
}

const dummyData: LeaderboardEntry[] = [
  { id: 1, name: "Alice", xp: 15000, level: 30, avatar: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "Bob", xp: 14500, level: 29, avatar: "/placeholder.svg?height=50&width=50" },
  { id: 3, name: "Charlie", xp: 14000, level: 28, avatar: "/placeholder.svg?height=50&width=50" },
  { id: 4, name: "David", xp: 13500, level: 27, avatar: "/placeholder.svg?height=50&width=50" },
  { id: 5, name: "Eve", xp: 13000, level: 26, avatar: "/placeholder.svg?height=50&width=50" },
  { id: 6, name: "Frank", xp: 12500, level: 25, avatar: "/placeholder.svg?height=50&width=50" },
  { id: 7, name: "Grace", xp: 12000, level: 24, avatar: "/placeholder.svg?height=50&width=50" },
  { id: 8, name: "Henry", xp: 11500, level: 23, avatar: "/placeholder.svg?height=50&width=50" },
  { id: 9, name: "Ivy", xp: 11000, level: 22, avatar: "/placeholder.svg?height=50&width=50" },
  { id: 10, name: "Jack", xp: 10500, level: 21, avatar: "/placeholder.svg?height=50&width=50" },
]

export function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'allTime'>('allTime')

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // For now, we'll use the dummy data
    setLeaderboardData(dummyData)
  }, [timeFrame])

  const getIcon = (position: number) => {
    switch (position) {
      case 1:
        return <FaTrophy className="text-yellow-400" />
      case 2:
        return <FaMedal className="text-gray-400" />
      case 3:
        return <FaMedal className="text-yellow-600" />
      default:
        return <FaStar className="text-purple-400" />
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center gradient-text">Leaderboard</h2>

      <div className="flex justify-center mb-6 space-x-4">
        {['daily', 'weekly', 'allTime'].map((frame) => (
          <motion.button
            key={frame}
            onClick={() => setTimeFrame(frame as 'daily' | 'weekly' | 'allTime')}
            className={`px-4 py-2 rounded-full ${
              timeFrame === frame
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {frame.charAt(0).toUpperCase() + frame.slice(1)}
          </motion.button>
        ))}
      </div>

      <FuturisticCard className="p-6">
        <div className="space-y-4">
          {leaderboardData.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold">{index + 1}</span>
                {getIcon(index + 1)}
                <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full" />
                <span className="font-semibold">{entry.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-purple-400">Level {entry.level}</span>
                <span className="text-yellow-400">{entry.xp} XP</span>
              </div>
            </motion.div>
          ))}
        </div>
      </FuturisticCard>
    </div>
  )
}

