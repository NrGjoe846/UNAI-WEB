"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FuturisticCard } from '@/components/ui/FuturisticCard'
import { FaBook, FaTrophy, FaChartLine, FaUsers, FaCoins, FaCode, FaRocket, FaBrain, FaCalendar } from 'react-icons/fa'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import dynamic from 'next/dynamic'
import { Challenges } from '@/components/Challenges'

const DynamicAchievements = dynamic(() => import('@/components/Achievements').then(mod => mod.Achievements), {
  loading: () => <p>Loading Achievements...</p>,
})

const DynamicLeaderboard = dynamic(() => import('@/components/Leaderboard').then(mod => mod.Leaderboard), {
  loading: () => <p>Loading Leaderboard...</p>,
})

const courses = [
  { id: 1, title: "Introduction to AI", progress: 60 },
  { id: 2, title: "Blockchain Fundamentals", progress: 30 },
  { id: 3, title: "Advanced JavaScript", progress: 80 },
  { id: 4, title: "Cloud Computing Essentials", progress: 10 },
]

const leaderboard = [
  { rank: 1, name: "Alice", xp: 15000 },
  { rank: 2, name: "Bob", xp: 14500 },
  { rank: 3, name: "Charlie", xp: 14000 },
  { rank: 4, name: "David", xp: 13500 },
  { rank: 5, name: "Eve", xp: 13000 },
]

const upcomingEvents = [
  { id: 1, title: "AI Hackathon", date: "2023-07-15" },
  { id: 2, title: "Web Dev Workshop", date: "2023-07-20" },
  { id: 3, title: "Data Science Webinar", date: "2023-07-25" },
]

export default function Dashboard() {
  const [xp, setXp] = useState(1250)
  const [level, setLevel] = useState(5)
  const [streak, setStreak] = useState(7)
  const [coins, setCoins] = useState(500)
  const [dailyGoal, setDailyGoal] = useState(0)

  useEffect(() => {
    // Simulating daily goal progress
    const interval = setInterval(() => {
      setDailyGoal(prev => (prev < 100 ? prev + 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen p-8 relative">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background" />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"
            animate={{
              x: ["100%", "-100%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              delay: i * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-center gradient-text"
        >
          Welcome back, Space Cadet!
        </motion.h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <FuturisticCard className="p-6">
            <h2 className="text-xl font-bold mb-2">Level {level}</h2>
            <p className="text-purple-400 text-2xl font-bold">{xp} XP</p>
            <Progress value={xp % 1000} max={1000} className="mt-2" />
          </FuturisticCard>
          <FuturisticCard className="p-6">
            <h2 className="text-xl font-bold mb-2">Streak</h2>
            <p className="text-purple-400 text-2xl font-bold">{streak} days</p>
            <div className="flex justify-between mt-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full ${
                    i < streak ? 'bg-purple-500' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </FuturisticCard>
          <FuturisticCard className="p-6">
            <h2 className="text-xl font-bold mb-2">Daily Goal</h2>
            <Progress value={dailyGoal} className="mb-2" />
            <p className="text-purple-400 text-2xl font-bold">{dailyGoal}% Complete</p>
          </FuturisticCard>
          <FuturisticCard className="p-6">
            <h2 className="text-xl font-bold mb-2">TechCoins</h2>
            <p className="text-purple-400 text-2xl font-bold flex items-center">
              {coins} <FaCoins className="ml-2" />
            </p>
          </FuturisticCard>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <FuturisticCard className="p-6">
            <h2 className="text-2xl font-bold mb-4">Daily Challenge</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Python Challenge</h3>
              <p className="text-gray-400">Create a function that calculates the Fibonacci sequence</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Start Challenge
              </motion.button>
            </div>
          </FuturisticCard>

          <FuturisticCard className="p-6">
            <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
            <DynamicLeaderboard />
          </FuturisticCard>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Your Courses</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map(course => (
              <FuturisticCard key={course.id} className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <Progress value={course.progress} className="mb-2" />
                <div className="flex justify-between items-center">
                  <span>{course.progress}% complete</span>
                  <Link
                    href={`/course/${course.id}`}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105"
                  >
                    Continue
                  </Link>
                </div>
              </FuturisticCard>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <FuturisticCard key={event.id} className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-400 flex items-center">
                  <FaCalendar className="mr-2" /> {event.date}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Register
                </motion.button>
              </FuturisticCard>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 gradient-text">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FaRocket, title: "Skill Tree", href: "/skill-tree" },
              { icon: FaTrophy, title: "Achievements", href: "/achievements" },
              { icon: FaChartLine, title: "Progress", href: "/progress" },
              { icon: FaUsers, title: "Study Groups", href: "/study-groups" },
              { icon: FaCode, title: "Code Playground", href: "/code-playground" },
              { icon: FaCoins, title: "TechShop", href: "/shop" },
              { icon: FaBook, title: "Learning Path", href: "/learning-path" },
              { icon: FaBrain, title: "Find a Mentor", href: "/mentors" },
            ].map((action, index) => (
              <Link key={index} href={action.href}>
                <FuturisticCard className="p-4 text-center hover:scale-105 transition-transform">
                  <action.icon className="text-3xl text-purple-500 mb-2 mx-auto" />
                  <span className="text-sm">{action.title}</span>
                </FuturisticCard>
              </Link>
            ))}
          </div>
        </section>
        <section className="mb-8">
          <DynamicAchievements />
        </section>
        <section className="mb-8">
          <Challenges />
        </section>
      </div>
    </div>
  )
}

