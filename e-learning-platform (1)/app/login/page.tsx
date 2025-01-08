"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      // Here you would typically make an API call to authenticate the user
      // For now, we'll just simulate a successful login
      console.log('Login attempted with:', email, password)
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      // Here you would typically make an API call to initiate password recovery
      console.log('Password recovery requested for:', email)
      setShowPasswordRecovery(false)
    } catch (err) {
      setError('Failed to initiate password recovery')
    }
  }

  const handleSkip = () => {
    router.push('/dashboard')
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
            TechQuest Academy
          </motion.h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {!showPasswordRecovery ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Galactic Email</label>
                <motion.input
                  whileFocus={{ scale: 1.05 }}
                  id="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Secret Passcode</label>
                <motion.input
                  whileFocus={{ scale: 1.05 }}
                  id="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-md text-white font-semibold transition-all duration-300"
              >
                Launch into Learning
              </motion.button>
            </form>
          ) : (
            <form onSubmit={handlePasswordRecovery} className="space-y-6">
              <div>
                <label htmlFor="recovery-email" className="block text-sm font-medium text-gray-300 mb-1">Enter your Galactic Email</label>
                <motion.input
                  whileFocus={{ scale: 1.05 }}
                  id="recovery-email"
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-md text-white font-semibold transition-all duration-300"
              >
                Recover Passcode
              </motion.button>
            </form>
          )}
          <div className="mt-4 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowPasswordRecovery(!showPasswordRecovery)}
              className="text-sm text-cyan-400 hover:underline"
            >
              {showPasswordRecovery ? "Back to Login" : "Lost in space? Reset your passcode"}
            </motion.button>
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-all duration-300"
              >
                <FaGoogle className="w-5 h-5 text-red-500" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-all duration-300"
              >
                <FaFacebook className="w-5 h-5 text-blue-500" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-all duration-300"
              >
                <FaGithub className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-400">New to the galaxy?</p>
            <motion.a 
              href="/register" 
              className="text-cyan-400 hover:underline"
              whileHover={{ scale: 1.05 }}
            >
              Begin your cosmic journey
            </motion.a>
          </div>
          <div className="mt-6 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleSkip}
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Skip login and explore as a guest
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

