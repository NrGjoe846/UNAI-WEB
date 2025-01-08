"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FuturisticCard } from '@/components/ui/FuturisticCard'
import { FaStar, FaGraduationCap, FaBriefcase, FaCalendar, FaComments } from 'react-icons/fa'

const mentors = [
  {
    id: 1,
    name: "Dr. Ada Lovelace",
    expertise: ["Artificial Intelligence", "Machine Learning", "Neural Networks"],
    experience: 15,
    rating: 4.9,
    availability: ["Mon", "Wed", "Fri"],
    image: "/placeholder.svg?height=200&width=200",
    bio: "Pioneering AI researcher with a passion for teaching complex concepts in simple terms."
  },
  {
    id: 2,
    name: "Prof. Alan Turing",
    expertise: ["Algorithms", "Cryptography", "Theoretical Computer Science"],
    experience: 20,
    rating: 4.8,
    availability: ["Tue", "Thu", "Sat"],
    image: "/placeholder.svg?height=200&width=200",
    bio: "Renowned computer scientist dedicated to nurturing the next generation of innovators."
  },
  {
    id: 3,
    name: "Grace Hopper",
    expertise: ["Programming Languages", "Compiler Design", "Software Engineering"],
    experience: 18,
    rating: 4.7,
    availability: ["Mon", "Tue", "Thu"],
    image: "/placeholder.svg?height=200&width=200",
    bio: "Trailblazing computer programmer committed to making coding accessible to all."
  },
]

export default function Mentors() {
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const handleMentorClick = (mentor: any) => {
    setSelectedMentor(mentor)
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
          Find Your Tech Mentor
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <motion.div
              key={mentor.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMentorClick(mentor)}
            >
              <FuturisticCard className="p-6 cursor-pointer">
                <div className="flex items-center mb-4">
                  <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <h2 className="text-xl font-bold">{mentor.name}</h2>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                <span className="text-gray-400">{mentor.rating}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <FaGraduationCap className="text-purple-500 mr-2" />
              <span>{mentor.expertise.join(", ")}</span>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-purple-500 mr-2" />
              <span>{mentor.experience} years experience</span>
            </div>
            <div className="flex items-center">
              <FaCalendar className="text-purple-500 mr-2" />
              <span>Available: {mentor.availability.join(", ")}</span>
            </div>
          </div>
        </FuturisticCard>
      </motion.div>
    ))}
  </div>

  <AnimatePresence>
    {showModal && selectedMentor && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
      >
        <FuturisticCard className="p-8 max-w-md w-full">
          <div className="flex items-center mb-4">
            <img src={selectedMentor.image} alt={selectedMentor.name} className="w-24 h-24 rounded-full mr-4" />
            <div>
              <h2 className="text-2xl font-bold">{selectedMentor.name}</h2>
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-gray-400">{selectedMentor.rating}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 mb-4">{selectedMentor.bio}</p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <FaGraduationCap className="text-purple-500 mr-2" />
              <span>{selectedMentor.expertise.join(", ")}</span>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-purple-500 mr-2" />
              <span>{selectedMentor.experience} years experience</span>
            </div>
            <div className="flex items-center">
              <FaCalendar className="text-purple-500 mr-2" />
              <span>Available: {selectedMentor.availability.join(", ")}</span>
            </div>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Schedule Session
          </button>
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

