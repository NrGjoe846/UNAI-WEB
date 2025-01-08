"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FuturisticCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  hover?: boolean
}

export function FuturisticCard({ 
  children, 
  className = "", 
  glowColor = "rgba(147, 51, 234, 0.3)", 
  hover = true 
}: FuturisticCardProps) {
  return (
    <motion.div
      className={`glass-card relative overflow-hidden ${className}`}
      whileHover={hover ? {
        scale: 1.02,
        boxShadow: `0 0 20px ${glowColor}`,
      } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -translate-x-[100%] animate-[shimmer_2s_infinite]" />
      {children}
    </motion.div>
  )
}

