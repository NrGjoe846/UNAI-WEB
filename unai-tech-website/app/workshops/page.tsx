'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Users } from 'lucide-react'

const workshops = [
  {
    title: 'BioPython Basics',
    description: 'Learn the fundamentals of BioPython for biological data analysis.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    date: '2023-07-15',
    duration: '1 day',
    capacity: 30,
    level: 'Beginner',
  },
  {
    title: 'Advanced Machine Learning',
    description: 'Dive deep into advanced machine learning techniques and algorithms.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    date: '2023-08-01',
    duration: '3 days',
    capacity: 20,
    level: 'Advanced',
  },
  {
    title: 'AI Ethics and Governance',
    description: 'Explore the ethical implications and governance of AI systems.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    date: '2023-08-15',
    duration: '2 days',
    capacity: 50,
    level: 'Intermediate',
  },
]

export default function Workshops() {
  const [filter, setFilter] = useState('all')

  const filteredWorkshops = workshops.filter(workshop => 
    filter === 'all' || workshop.level.toLowerCase() === filter
  )

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">Upcoming Workshops</h1>
      
      <div className="mb-8">
        <label htmlFor="filter" className="mr-2">Filter by level:</label>
        <select 
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white/10 rounded-md p-2"
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorkshops.map((workshop) => (
          <motion.div
            key={workshop.title}
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden"
          >
            <Image
              src={workshop.image}
              alt={workshop.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{workshop.title}</h2>
              <p className="text-gray-300 mb-4">{workshop.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm">{workshop.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{workshop.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-sm">{workshop.capacity} participants</span>
                </div>
              </div>
              <span className="inline-block bg-yellow-400/20 text-yellow-400 text-xs px-2 py-1 rounded-full mb-4">
                {workshop.level}
              </span>
              <Link 
                href={`/workshops/${workshop.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="block w-full text-center py-2 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors"
              >
                Learn More & Register
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

