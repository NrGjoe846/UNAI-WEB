"use client"

import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.div
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" />
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-background to-background" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
        >
          Master the Future of Tech
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-8"
        >
          Embark on a journey through cutting-edge technology and innovation
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/register"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 inline-block"
          >
            Start Your Journey
          </Link>
        </motion.div>
      </div>

      {/* Floating Elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-500 rounded-full"
          animate={{
            y: ["0vh", "100vh"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
          }}
        />
      ))}
    </motion.div>
  )
}

