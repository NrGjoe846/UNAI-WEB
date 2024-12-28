'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Search, User, Menu, X, Sun, Moon, Bell } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/components/auth-provider'
import { useNotifications } from '@/components/notifications-provider'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const { notifications } = useNotifications()

  const navItems = ['Workshops', 'Courses', 'Events', 'Resources', 'AI Projects', 'Community', 'Contact']

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/30 dark:bg-black/30 backdrop-blur-md z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 sm:gap-8">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
          UNAI TECH
        </Link>
        <div className="hidden md:flex gap-4 lg:gap-6">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm hover:text-yellow-400 transition-colors transform hover:scale-105"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white/10 dark:bg-black/10 rounded-full py-1 px-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-40 lg:w-60"
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-1 rounded-full bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className="relative">
          <button className="p-1 rounded-full bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
              {notifications.length}
            </span>
          )}
        </div>
        {user ? (
          <div className="relative group">
            <button className="p-1 rounded-full bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Profile
              </Link>
              <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Settings
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link href="/login" className="p-1 rounded-full bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 transition-colors">
            <User className="w-5 h-5" />
          </Link>
        )}
        <button
          className="md:hidden p-1 rounded-full bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 py-4 px-6 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block py-2 text-sm hover:text-yellow-400 transition-colors transform hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

