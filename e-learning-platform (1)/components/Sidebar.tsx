"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaHome, FaBook, FaCode, FaTrophy, FaUser, FaUsers, FaChartLine, FaRocket, FaCog } from 'react-icons/fa'

const menuItems = [
  { icon: FaHome, label: 'Dashboard', href: '/dashboard' },
  { icon: FaBook, label: 'Learning Path', href: '/learning-path' },
  { icon: FaCode, label: 'Code Playground', href: '/code-playground' },
  { icon: FaTrophy, label: 'Achievements', href: '/achievements' },
  { icon: FaUsers, label: 'Study Groups', href: '/study-groups' },
  { icon: FaChartLine, label: 'Progress', href: '/progress' },
  { icon: FaRocket, label: 'Challenges', href: '/challenges' },
  { icon: FaUser, label: 'Profile', href: '/profile' },
  { icon: FaCog, label: 'Settings', href: '/settings' },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  return (
    <motion.div
      className="bg-gray-900 text-white h-screen"
      initial={{ width: isOpen ? 240 : 80 }}
      animate={{ width: isOpen ? 240 : 80 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? '<<' : '>>'}
        </motion.button>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <motion.div
                  className={`flex items-center p-4 ${
                    pathname === item.href ? 'bg-purple-700' : 'hover:bg-gray-800'
                  }`}
                  whileHover={{ x: 10 }}
                >
                  <item.icon className="mr-4" />
                  {isOpen && <span>{item.label}</span>}
                </motion.div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  )
}

