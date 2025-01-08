"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FuturisticCard } from '@/components/ui/FuturisticCard'
import { Progress } from '@/components/ui/progress'
import { FaTrophy, FaCode, FaBrain, FaRocket } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

type Challenge = {
  id: number
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  xpReward: number
  progress: number
  icon: React.ElementType
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Python Basics",
    description: "Complete 5 Python coding exercises",
    difficulty: "easy",
    xpReward: 100,
    progress: 60,
    icon: FaCode
  },
  {
    id: 2,
    title: "AI Concepts",
    description: "Watch 3 AI lecture videos and pass the quiz",
    difficulty: "medium",
    xpReward: 200,
    progress: 33,
    icon: FaBrain
  },
  {
    id: 3,
    title: "Hackathon Hero",
    description: "Participate in the weekend hackathon and submit a project",
    difficulty: "hard",
    xpReward: 500,
    progress: 0,
    icon: FaRocket
  },
]

export function Challenges() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)

  const handleStartChallenge = (challenge: Challenge) => {
    // Here you would typically start the challenge or redirect to the challenge page
    console.log(`Starting challenge: ${challenge.title}`)
    setSelectedChallenge(challenge)
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center gradient-text">Daily Challenges</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <FuturisticCard className="p-6">
              <div className="flex items-center mb-4">
                <challenge.icon className="text-4xl text-purple-500 mr-4" />
                <div>
                  <h3 className="text-xl font-bold">{challenge.title}</h3>
                  <p className="text-gray-400 text-sm">{challenge.description}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm ${
                  challenge.difficulty === 'easy' ? 'text-green-400' :
                  challenge.difficulty === 'medium' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                </span>
                <span className="text-purple-400">{challenge.xpReward} XP</span>
              </div>
              <Progress value={challenge.progress} className="mb-4" />
              <Button 
                className="w-full" 
                onClick={() => handleStartChallenge(challenge)}
                disabled={challenge.progress === 100}
              >
                {challenge.progress === 100 ? 'Completed' : 'Start Challenge'}
              </Button>
            </FuturisticCard>
          </motion.div>
        ))}
      </div>
      {selectedChallenge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <FuturisticCard className="p-6">
            <h3 className="text-2xl font-bold mb-4">{selectedChallenge.title}</h3>
            <p className="text-gray-400 mb-4">{selectedChallenge.description}</p>
            <p className="mb-2">Difficulty: <span className={`font-bold ${
              selectedChallenge.difficulty === 'easy' ? 'text-green-400' :
              selectedChallenge.difficulty === 'medium' ? 'text-yellow-400' :
              'text-red-400'
            }`}>{selectedChallenge.difficulty.charAt(0).toUpperCase() + selectedChallenge.difficulty.slice(1)}</span></p>
            <p className="mb-4">Reward: <span className="font-bold text-purple-400">{selectedChallenge.xpReward} XP</span></p>
            <Button className="w-full">Go to Challenge</Button>
          </FuturisticCard>
        </motion.div>
      )}
    </div>
  )
}

