"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FuturisticCard } from '@/components/ui/FuturisticCard'
import { Progress } from '@/components/ui/progress'
import { FaBook, FaTrophy, FaChartLine, FaCode, FaBrain } from 'react-icons/fa'

const skillCategories = [
  { id: 'programming', name: 'Programming', icon: FaCode, progress: 65 },
  { id: 'ai', name: 'Artificial Intelligence', icon: FaBrain, progress: 40 },
  { id: 'data', name: 'Data Science', icon: FaChartLine, progress: 55 },
  { id: 'web', name: 'Web Development', icon: FaCode, progress: 80 },
  { id: 'cloud', name: 'Cloud Computing', icon: FaBook, progress: 30 },
]

const achievements = [
  { id: 1, name: 'Code Ninja', description: 'Complete 50 coding challenges', progress: 80 },
  { id: 2, name: 'AI Apprentice', description: 'Finish the Intro to AI course', progress: 100 },
  { id: 3, name: 'Data Dynamo', description: 'Analyze 10 datasets', progress: 60 },
  { id: 4, name: 'Web Wizard', description: 'Deploy 5 web applications', progress: 40 },
  { id: 5, name: 'Cloud Champion', description: 'Complete all cloud computing modules', progress: 20 },
]

export default function ProgressPage() {
  const [selectedCategory, setSelectedCategory] = useState('programming')

  return (
    <div className="min-h-screen p-8 relative">
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
          Your Learning Progress
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <FuturisticCard className="p-6">
            <h2 className="text-2xl font-bold mb-4">Skill Progress</h2>
            <div className="space-y-4">
              {skillCategories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <category.icon className="mr-2" />
                      {category.name}
                    </span>
                    <span>{category.progress}%</span>
                  </div>
                  <Progress value={category.progress} className="h-2" />
                </div>
              ))}
            </div>
          </FuturisticCard>

          <FuturisticCard className="p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{achievement.name}</span>
                    <span>{achievement.progress}%</span>
                  </div>
                  <Progress value={achievement.progress} className="h-2" />
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              ))}
            </div>
          </FuturisticCard>
        </div>

        <FuturisticCard className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Detailed Skill Breakdown</h2>
          <div className="flex mb-4 space-x-4">
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {/* This is where we'd render specific skills for the selected category */}
            {/* For demonstration, we'll just show some placeholder content */}
            {[1, 2, 3, 4].map((skill) => (
              <div key={skill} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Skill {skill}</h3>
                <Progress value={Math.random() * 100} className="h-2 mb-2" />
                <p className="text-sm text-gray-400">Description of Skill {skill}</p>
              </div>
            ))}
          </div>
        </FuturisticCard>

        <FuturisticCard className="p-6">
          <h2 className="text-2xl font-bold mb-4">Learning Recommendations</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((recommendation) => (
              <div key={recommendation} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Recommended Course {recommendation}</h3>
                <p className="text-sm text-gray-400 mb-4">Description of recommended course {recommendation}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Start Course
                </motion.button>
              </div>
            ))}
          </div>
        </FuturisticCard>
      </div>
    </div>
  )
}

