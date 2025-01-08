"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaHome, FaBook, FaCode, FaTrophy, FaUser } from 'react-icons/fa'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: FaHome },
  { href: '/learning-path', label: 'Learning Path', icon: FaBook },
  { href: '/code-playground', label: 'Code Playground', icon: FaCode },
  { href: '/achievements', label: 'Achievements', icon: FaTrophy },
  { href: '/profile', label: 'Profile', icon: FaUser },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-orbitron font-bold text-cyan-400">
          TechQuest Academy
        </Link>
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="relative">
                <motion.div
                  className="flex items-center px-3 py-2 rounded-md text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="mr-2" />
                  <span className="hidden md:inline">{item.label}</span>
                </motion.div>
                {pathname === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"
                    layoutId="underline"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

