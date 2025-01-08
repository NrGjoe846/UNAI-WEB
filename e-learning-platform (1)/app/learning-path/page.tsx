"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FuturisticCard } from '@/components/ui/FuturisticCard'
import { Progress } from '@/components/ui/progress'
import { FaLock, FaCheck, FaPlay, FaTrophy, FaStar } from 'react-icons/fa'

const learningPath = [
  { 
    id: 1, 
    title: "Programming Fundamentals", 
    completed: true, 
    progress: 100,
    modules: [
      { id: 101, title: "Introduction to Programming", completed: true, duration: "2 hours" },
      { id: 102, title: "Variables and Data Types", completed: true, duration: "3 hours" },
      { id: 103, title: "Control Structures", completed: true, duration: "4 hours" },
    ]
  },
  { 
    id: 2, 
    title: "Web Development Basics", 
    completed: false, 
    progress: 33,
    modules: [
      { id: 201, title: "HTML Essentials", completed: true, duration: "3 hours" },
      { id: 202, title: "CSS Styling", completed: false, duration: "4 hours" },
      { id: 203, title: "JavaScript Basics", completed: false, duration: "5 hours" },
    ]
  },
  { 
    id: 3, 
    title: "Advanced JavaScript", 
    completed: false, 
    progress: 0,
    modules: [
      { id: 301, title: "Functions and Scope", completed: false, duration: "3 hours" },
      { id: 302, title: "Object-Oriented JavaScript", completed: false, duration: "4 hours" },
      { id: 303, title: "Asynchronous JavaScript", completed: false, duration: "5 hours" },
    ]
  },
  { 
    id: 4, 
    title: "React Fundamentals", 
    completed: false, 
    progress: 0,
    modules: [
      { id: 401, title: "Introduction to React", completed: false, duration: "3 hours" },
      { id: 402, title: "Components and Props", completed: false, duration: "4 hours" },
      { id: 403, title: "State and Lifecycle", completed: false, duration: "5 hours" },
    ]
  },
]

export default function LearningPath() {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null)
  const [hoveredModule, setHoveredModule] = useState<number | null>(null)

  const toggleCourse = (courseId: number) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null)
    } else {
      setExpandedCourse(courseId)
    }
  }

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
          Your Learning Path
        </motion.h1>

        <div className="space-y-6">
          {learningPath.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FuturisticCard className="p-6">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleCourse(course.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${course.completed ? 'bg-green-500' : 'bg-blue-500'}`}>
                      {course.completed ? <FaCheck className="text-white" /> : <FaPlay className="text-white" />}
                    </div>
                    <h2 className="text-2xl font-bold">{course.title}</h2>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Progress value={course.progress} className="w-32" />
                    <span className="text-sm text-gray-400">{course.progress}% Complete</span>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedCourse === course.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-2"
                    >
                      {course.modules.map((module) => (
                        <motion.div 
                          key={module.id} 
                          className="flex items-center justify-between bg-gray-800 p-3 rounded"
                          whileHover={{ scale: 1.02 }}
                          onHoverStart={() => setHoveredModule(module.id)}
                          onHoverEnd={() => setHoveredModule(null)}
                        >
                          <div className="flex items-center space-x-2">
                            <span>{module.title}</span>
                            {hoveredModule === module.id && (
                              <span className="text-xs text-gray-400">({module.duration})</span>
                            )}
                          </div>
                          {module.completed ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <FaLock className="text-gray-400" />
                          )}
                        </motion.div>
                      ))}
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <FaTrophy className="text-yellow-500" />
                          <span className="text-sm text-gray-400">Earn a certificate upon completion</span>
                        </div>
                        <Link href={`/course/${course.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                          >
                            {course.completed ? "Review Course" : "Continue Learning"}
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FuturisticCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4 gradient-text">Your Learning Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FuturisticCard className="p-4">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {learningPath.filter(course => course.completed).length}
              </div>
              <div className="text-sm text-gray-400">Courses Completed</div>
            </FuturisticCard>
            <FuturisticCard className="p-4">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {learningPath.reduce((total, course) => total + course.modules.length, 0)}
              </div>
              <div className="text-sm text-gray-400">Total Modules</div>
            </FuturisticCard>
            <FuturisticCard className="p-4">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {Math.round(learningPath.reduce((total, course) => total + course.progress, 0) / learningPath.length)}%
              </div>
              <div className="text-sm text-gray-400">Overall Progress</div>
            </FuturisticCard>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors inline-block hover:from-purple-700 hover:to-blue-700">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

