'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Book, Award, Clock, Star } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import GamificationDisplay from '@/components/GamificationDisplay'
import CertificateGenerator from '@/components/CertificateGenerator'

const courseProgress = [
  { name: 'AI Fundamentals', progress: 100, points: 500 },
  { name: 'Machine Learning Basics', progress: 60, points: 300 },
  { name: 'Deep Learning with PyTorch', progress: 30, points: 150 },
]

const badges = [
  { name: 'Fast Learner', description: 'Completed 3 courses in record time', icon: Clock },
  { name: 'AI Enthusiast', description: 'Completed all AI Fundamentals modules', icon: Book },
  { name: 'Rising Star', description: 'Earned 1000 points', icon: Star },
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState('progress')
  const { user } = useAuth()

  const totalPoints = courseProgress.reduce((sum, course) => sum + course.points, 0)

  if (!user) {
    return <div>Please log in to view your profile.</div>
  }

  return (
    <div className="py-12">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 mb-8">
        <div className="flex items-center gap-8 mb-6">
          <Image
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
            alt={user.name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{user.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Member since January 2023</p>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex items-center">
            <Book className="w-5 h-5 mr-2 text-yellow-400" />
            <span>{courseProgress.length} courses in progress</span>
          </div>
          <div className="flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-400" />
            <span>{totalPoints} points earned</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <button
          className={`mr-4 pb-2 ${activeTab === 'progress' ? 'border-b-2 border-yellow-400' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          Course Progress
        </button>
        <button
          className={`pb-2 ${activeTab === 'achievements' ? 'border-b-2 border-yellow-400' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
      </div>

      {activeTab === 'progress' && (
        <div className="space-y-6">
          {courseProgress.map((course) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">{course.name}</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div
                  className="bg-yellow-400 h-2.5 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">{course.progress}% complete</p>
                <p className="text-sm font-semibold">{course.points} points</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex items-center gap-4"
            >
              <badge.icon className="w-12 h-12 text-yellow-400" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{badge.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <GamificationDisplay />
      <CertificateGenerator />
    </div>
  )
}

