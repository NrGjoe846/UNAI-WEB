"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaLock, FaCheck, FaPlay } from 'react-icons/fa'

const lessons = [
  { id: 1, title: "Introduction to AI Concepts", completed: true },
  { id: 2, title: "Machine Learning Basics", completed: true },
  { id: 3, title: "Neural Networks Explained", completed: false },
  { id: 4, title: "Deep Learning Applications", locked: true },
  { id: 5, title: "AI Ethics and Future Trends", locked: true },
]

export default function CoursePage({ params }: { params: { id: string } }) {
  const [currentLesson, setCurrentLesson] = useState(1)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-orbitron font-bold text-cyan-400">TechQuest Academy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link></li>
              <li><Link href="/profile" className="hover:text-cyan-400 transition-colors">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Course: Introduction to Artificial Intelligence</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-bold mb-4">Lesson {currentLesson}: {lessons[currentLesson - 1].title}</h2>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="bg-gray-700 flex items-center justify-center">
                  <FaPlay className="text-4xl text-cyan-400" />
                </div>
              </div>
              <p className="mb-4">This is where the lesson content would go. It could include text, images, and interactive elements.</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Complete Lesson
              </motion.button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Quiz</h3>
              <p className="mb-4">Test your knowledge with a quick quiz on the concepts covered in this lesson.</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Start Quiz
              </motion.button>
            </div>
          </div>

          <div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Course Progress</h3>
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <motion.div 
                    key={lesson.id}
                    className={`p-3 rounded-lg flex items-center justify-between ${
                      lesson.id === currentLesson ? 'bg-cyan-600' : 
                      lesson.completed ? 'bg-green-600' : 
                      lesson.locked ? 'bg-gray-700' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    whileHover={!lesson.locked && { scale: 1.03 }}
                    onClick={() => !lesson.locked && setCurrentLesson(lesson.id)}
                  >
                    <span>{lesson.title}</span>
                    {lesson.completed && <FaCheck />}
                    {lesson.locked && <FaLock />}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

