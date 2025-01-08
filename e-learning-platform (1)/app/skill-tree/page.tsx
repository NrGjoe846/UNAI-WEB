"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FuturisticCard } from '@/components/ui/FuturisticCard'
import { FaLock, FaCheck, FaCode, FaBrain, FaRobot, FaDatabase, FaCloud, FaShieldAlt } from 'react-icons/fa'
import Link from 'next/link'

const skillTree = [
  {
    id: 'fundamentals',
    name: 'Programming Fundamentals',
    icon: FaCode,
    skills: [
      { id: 1, name: "Variables & Data Types", completed: true, xp: 100 },
      { id: 2, name: "Control Structures", completed: true, xp: 150 },
      { id: 3, name: "Functions", completed: true, xp: 200 },
      { id: 4, name: "Object-Oriented Programming", completed: false, xp: 250, requires: [1, 2, 3] },
    ]
  },
  {
    id: 'algorithms',
    name: 'Algorithms & Data Structures',
    icon: FaBrain,
    skills: [
      { id: 5, name: "Arrays & Linked Lists", completed: false, xp: 200, requires: [1, 2, 3] },
      { id: 6, name: "Stacks & Queues", completed: false, xp: 250, requires: [5] },
      { id: 7, name: "Trees & Graphs", completed: false, xp: 300, requires: [5, 6] },
      { id: 8, name: "Sorting & Searching", completed: false, xp: 350, requires: [5, 6, 7] },
    ]
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    icon: FaRobot,
    skills: [
      { id: 9, name: "Machine Learning Basics", completed: false, xp: 300, requires: [4, 8] },
      { id: 10, name: "Neural Networks", completed: false, xp: 350, requires: [9] },
      { id: 11, name: "Deep Learning", completed: false, xp: 400, requires: [10] },
      { id: 12, name: "Natural Language Processing", completed: false, xp: 450, requires: [11] },
    ]
  },
  {
    id: 'databases',
    name: 'Databases',
    icon: FaDatabase,
    skills: [
      { id: 13, name: "Relational Databases", completed: false, xp: 250, requires: [4] },
      { id: 14, name: "SQL", completed: false, xp: 300, requires: [13] },
      { id: 15, name: "NoSQL Databases", completed: false, xp: 350, requires: [13] },
      { id: 16, name: "Database Design", completed: false, xp: 400, requires: [14, 15] },
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    icon: FaCloud,
    skills: [
      { id: 17, name: "Cloud Fundamentals", completed: false, xp: 200, requires: [4] },
      { id: 18, name: "Virtualization", completed: false, xp: 250, requires: [17] },
      { id: 19, name: "Containerization", completed: false, xp: 300, requires: [18] },
      { id: 20, name: "Serverless Computing", completed: false, xp: 350, requires: [19] },
    ]
  },
  {
    id: 'security',
    name: 'Cybersecurity',
    icon: FaShieldAlt,
    skills: [
      { id: 21, name: "Security Fundamentals", completed: false, xp: 250, requires: [4] },
      { id: 22, name: "Cryptography", completed: false, xp: 300, requires: [21] },
      { id: 23, name: "Network Security", completed: false, xp: 350, requires: [22] },
      { id: 24, name: "Ethical Hacking", completed: false, xp: 400, requires: [23] },
    ]
  },
]

export default function SkillTree() {
  const [unlockedSkills, setUnlockedSkills] = useState<number[]>([1, 2, 3])
  const [selectedSkill, setSelectedSkill] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const handleUnlockSkill = (skill: any) => {
    if (unlockedSkills.includes(skill.id)) return
    if (skill.requires.every((req: number) => unlockedSkills.includes(req))) {
      setUnlockedSkills([...unlockedSkills, skill.id])
    }
  }

  const handleSkillClick = (skill: any) => {
    setSelectedSkill(skill)
    setShowModal(true)
  }

  return (
    <div className="min-h-screen p-8 relative">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-background to-background" />
      </div>

      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-center gradient-text"
        >
          Tech Skill Tree
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillTree.map((category) => (
            <FuturisticCard key={category.id} className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <category.icon className="mr-2 text-purple-500" />
                {category.name}
              </h2>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    className={`p-4 rounded-lg cursor-pointer ${
                      unlockedSkills.includes(skill.id)
                        ? 'bg-purple-900/30'
                        : 'bg-gray-800/50'
                    }`}
                    onClick={() => handleSkillClick(skill)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{skill.name}</span>
                      {skill.completed ? (
                        <FaCheck className="text-green-500" />
                      ) : unlockedSkills.includes(skill.id) ? (
                        <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
                          In Progress
                        </span>
                      ) : (
                        <FaLock className="text-gray-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-400 mt-2">XP: {skill.xp}</div>
                  </motion.div>
                ))}
              </div>
            </FuturisticCard>
          ))}
        </div>

        <AnimatePresence>
          {showModal && selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
            >
              <FuturisticCard className="p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">{selectedSkill.name}</h2>
                <p className="text-gray-400 mb-4">XP: {selectedSkill.xp}</p>
                {unlockedSkills.includes(selectedSkill.id) ? (
                  <>
                    <p className="mb-4">
                      {selectedSkill.completed
                        ? "You've mastered this skill!"
                        : "You're currently working on this skill."}
                    </p>
                    <Link
                      href={`/courses/${selectedSkill.id}`}
                      className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                    >
                      {selectedSkill.completed ? "Review Course" : "Continue Learning"}
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="mb-4">
                      {selectedSkill.requires.every((req: number) => unlockedSkills.includes(req))
                        ? "You've unlocked this skill! Start learning now."
                        : "You need to complete the prerequisite skills to unlock this."}
                    </p>
                    <button
                      onClick={() => handleUnlockSkill(selectedSkill)}
                      className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full font-bold ${
                        selectedSkill.requires.every((req: number) => unlockedSkills.includes(req))
                          ? 'hover:from-purple-700 hover:to-blue-700'
                          : 'opacity-50 cursor-not-allowed'
                      } transition-all duration-300`}
                      disabled={!selectedSkill.requires.every((req: number) => unlockedSkills.includes(req))}
                    >
                      {selectedSkill.requires.every((req: number) => unlockedSkills.includes(req))
                        ? "Unlock Skill"
                        : "Skill Locked"}
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 w-full bg-gray-800 text-white px-4 py-2 rounded-full font-bold hover:bg-gray-700 transition-all duration-300"
                >
                  Close
                </button>
              </FuturisticCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

