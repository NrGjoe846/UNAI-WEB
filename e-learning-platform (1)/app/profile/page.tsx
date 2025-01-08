"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaMedal, FaChartLine, FaCog } from 'react-icons/fa'

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    level: 15,
    xp: 3750,
    totalLessonsCompleted: 87,
    achievements: [
      { id: 1, title: "Fast Learner", description: "Complete 10 lessons in a day" },
      { id: 2, title: "Consistent Coder", description: "Maintain a 7-day streak" },
      { id: 3, title: "AI Enthusiast", description: "Complete the Intro to AI course" },
    ]
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-orbitron font-bold text-cyan-400">TechQuest Academy</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link></li>
              <li><Link href="/logout" className="hover:text-cyan-400 transition-colors">Logout</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
              <div className="flex items-center mb-6">
                <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mr-4" />
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-cyan-400">{user.level}</p>
                  <p className="text-gray-400">Level</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-cyan-400">{user.xp}</p>
                  <p className="text-gray-400">XP</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-cyan-400">{user.totalLessonsCompleted}</p>
                  <p className="text-gray-400">Lessons Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Achievements</h3>
              <div className="space-y-4">
                {user.achievements.map((achievement) => (
                  <motion.div 
                    key={achievement.id}
                    className="bg-gray-700 p-4 rounded-lg"
                    whileHover={{ scale: 1.03 }}
                  >
                    <h4 className="font-bold">{achievement.title}</h4>
                    <p className="text-gray-400">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-4">
                {[
                  { icon: FaMedal, title: "View All Achievements", href: "/achievements" },
                  { icon: FaChartLine, title: "Learning Statistics", href: "/stats" },
                  { icon: FaCog, title: "Account Settings", href: "/settings" },
                ].map((action, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link href={action.href} className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      <action.icon className="text-cyan-400 mr-3" />
                      <span>{action.title}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Learning Path</h3>
              <p className="mb-4">You're on track to become a Full-Stack AI Developer!</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                View Full Learning Path
              </motion.button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

