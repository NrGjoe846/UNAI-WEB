"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FuturisticCard } from '@/components/ui/FuturisticCard'
import { Progress } from '@/components/ui/progress'
import { FaTrophy, FaMedal, FaStar, FaCode, FaBook, FaUsers, FaRocket, FaBrain } from 'react-icons/fa'
import confetti from 'canvas-confetti'

const achievementCategories = [
  {
    id: 'learning',
    name: 'Learning Path',
    icon: FaBook,
    achievements: [
      { id: 1, name: "First Steps", description: "Complete your first lesson", xp: 100, coins: 50, icon: FaTrophy, completed: true },
      { id: 2, name: "Quick Learner", description: "Complete 5 lessons in a day", xp: 200, coins: 100, icon: FaRocket, completed: true },
      { id: 3, name: "Knowledge Seeker", description: "Complete 50 lessons", xp: 500, coins: 250, icon: FaBrain, completed: false },
    ]
  },
  {
    id: 'coding',
    name: 'Coding Mastery',
    icon: FaCode,
    achievements: [
      { id: 4, name: "Hello World", description: "Write your first program", xp: 100, coins: 50, icon: FaTrophy, completed: true },
      { id: 5, name: "Bug Hunter", description: "Fix 10 coding errors", xp: 300, coins: 150, icon: FaMedal, completed: false },
      { id: 6, name: "Code Ninja", description: "Complete 20 coding challenges", xp: 500, coins: 250, icon: FaStar, completed: false },
    ]
  },
  {
    id: 'social',
    name: 'Community',
    icon: FaUsers,
    achievements: [
      { id: 7, name: "Team Player", description: "Join a study group", xp: 100, coins: 50, icon: FaTrophy, completed: true },
      { id: 8, name: "Mentor", description: "Help 5 other students", xp: 300, coins: 150, icon: FaMedal, completed: false },
      { id: 9, name: "Community Leader", description: "Create an active study group", xp: 500, coins: 250, icon: FaStar, completed: false },
    ]
  }
]

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState('learning')
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false)
  const [unlockedAchievement, setUnlockedAchievement] = useState<any>(null)
  const [userProgress, setUserProgress] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    // Initialize random progress for each achievement
    const initialProgress = achievementCategories.reduce((acc, category) => {
      category.achievements.forEach(achievement => {
        if (!achievement.completed) {
          acc[achievement.id] = Math.floor(Math.random() * 100)
        }
      })
      return acc
    }, {} as { [key: number]: number })
    setUserProgress(initialProgress)
  }, [])

  const simulateUnlock = (achievement: any) => {
    if (achievement.completed) return

    setUnlockedAchievement(achievement)
    setShowUnlockAnimation(true)
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    // Update progress
    setUserProgress(prev => ({ ...prev, [achievement.id]: 100 }))

    // Reset animation after delay
    setTimeout(() => {
      setShowUnlockAnimation(false)
      setUnlockedAchievement(null)
    }, 3000)
  }

  return (
    <div className="min-h-screen p-8 relative">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-background to-background" />
      </div>

      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-center gradient-text"
        >
          Achievements
        </motion.h1>

        {/* Category Selection */}
        <div className="flex justify-center mb-8 space-x-4">
          {achievementCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="text-xl" />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {achievementCategories
              .find(cat => cat.id === selectedCategory)
              ?.achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <FuturisticCard
                    className={`p-6 cursor-pointer ${
                      achievement.completed ? 'border-green-500' : 'border-gray-700'
                    }`}
                    onClick={() => simulateUnlock(achievement)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${
                        achievement.completed ? 'bg-green-500/20' : 'bg-gray-800'
                      }`}>
                        <achievement.icon className={`text-2xl ${
                          achievement.completed ? 'text-green-500' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{achievement.name}</h3>
                        <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-purple-400">+{achievement.xp} XP</span>
                          <span className="text-yellow-400">+{achievement.coins} Coins</span>
                        </div>
                        {!achievement.completed && (
                          <div className="mt-2">
                            <Progress value={userProgress[achievement.id] || 0} className="h-2" />
                            <p className="text-xs text-gray-400 mt-1">
                              Progress: {userProgress[achievement.id] || 0}%
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </FuturisticCard>
                </motion.div>
              ))
            }
          </AnimatePresence>
        </div>

        {/* Achievement Unlock Animation */}
        <AnimatePresence>
          {showUnlockAnimation && unlockedAchievement && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
            >
              <FuturisticCard className="p-8 text-center">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="text-6xl text-yellow-400 mb-4 inline-block"
                >
                  <unlockedAchievement.icon />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
                <p className="text-xl text-purple-400 mb-4">{unlockedAchievement.name}</p>
                <p className="text-gray-400 mb-4">{unlockedAchievement.description}</p>
                <div className="flex justify-center space-x-4 text-lg">
                  <span className="text-purple-400">+{unlockedAchievement.xp} XP</span>
                  <span className="text-yellow-400">+{unlockedAchievement.coins} Coins</span>
                </div>
              </FuturisticCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

