'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Book, Users, User, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react'

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  const sidebarItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Book, label: 'Workshops', href: '/workshops' },
    { icon: Book, label: 'Courses', href: '/courses' },
    { icon: Users, label: 'Community', href: '/community' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: HelpCircle, label: 'Help', href: '/help' },
  ]

  return (
    <motion.div
      className={`fixed left-0 top-16 bottom-0 bg-black/30 backdrop-blur-md p-2 rounded-r-lg transition-all duration-300 z-40 ${
        isExpanded ? 'w-64' : 'w-16'
      } hidden sm:block`}
      initial={false}
      animate={{ width: isExpanded ? 256 : 64 }}
    >
      {sidebarItems.map(({ icon: Icon, label, href }) => (
        <Link key={label} href={href}>
          <motion.div
            className="flex items-center p-2 rounded-lg hover:bg-white/10 transition-colors mb-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Icon className="w-6 h-6 mr-4" />
            {isExpanded && <span className="text-sm">{label}</span>}
          </motion.div>
        </Link>
      ))}
      <button
        className="absolute bottom-4 right-2 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </motion.div>
  )
}

