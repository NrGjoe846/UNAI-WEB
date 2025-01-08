"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      // Here you would typically make an API call to register the user
      // For now, we'll just simulate a successful registration
      console.log('Registration attempted with:', username, email, password)
      router.push('/onboarding')
    } catch (err) {
      setError('Failed to register. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-md"
      >
        <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg border border-cyan-400">
          <motion.h1 
            className="text-4xl font-bold text-center mb-6 font-orbitron text-cyan-400"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Join TechQuest Academy
          </motion.h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <motion.input
                  whileFocus={{ scale: 1.05 }}
                  id="username"
                  type="text"
                  required
                  className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Galactic Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <motion.input
                  whileFocus={{ scale: 1.05 }}
                  id="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Secret Passcode</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <motion.input
                  whileFocus={{ scale: 1.05 }}
                  id="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-md text-white font-semibold transition-all duration-300"
            >
              Begin Your Adventure
            </motion.button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400">Already have an account?</p>
            <motion.a 
              href="/login" 
              className="text-cyan-400 hover:underline"
              whileHover={{ scale: 1.05 }}
            >
              Log in to your spaceship
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

