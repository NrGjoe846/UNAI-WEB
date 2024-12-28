'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, Clock, MapPin, Filter } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

type EventType = 'workshop' | 'bootcamp' | 'crashcourse' | 'seminar'

interface Event {
  id: string
  title: string
  type: EventType
  date: Date
  time: string
  location: string
  image: string
  description: string
}

const events: Event[] = [
  {
    id: '1',
    title: 'AI Fundamentals Workshop',
    type: 'workshop',
    date: new Date(2023, 6, 15),
    time: '10:00 AM - 4:00 PM',
    location: 'Online',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Get started with the basics of Artificial Intelligence in this comprehensive one-day workshop.'
  },
  {
    id: '2',
    title: 'Machine Learning Bootcamp',
    type: 'bootcamp',
    date: new Date(2023, 7, 1),
    time: '9:00 AM - 5:00 PM',
    location: 'Tech Hub, New York',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Immerse yourself in machine learning with this intensive 3-day bootcamp.'
  },
  {
    id: '3',
    title: 'Python for Data Science Crash Course',
    type: 'crashcourse',
    date: new Date(2023, 7, 10),
    time: '2:00 PM - 6:00 PM',
    location: 'Online',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Learn the essentials of Python for data science in this fast-paced crash course.'
  },
  {
    id: '4',
    title: 'AI Ethics Seminar',
    type: 'seminar',
    date: new Date(2023, 8, 5),
    time: '3:00 PM - 5:00 PM',
    location: 'Virtual Auditorium',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Join us for an insightful seminar on the ethical considerations in AI development and deployment.'
  }
]

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all')

  const filteredEvents = events.filter(event => 
    (selectedType === 'all' || event.type === selectedType) &&
    (selectedDate ? event.date.toDateString() === selectedDate.toDateString() : true)
  )

  return (
    <div className="py-12 flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/3">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </div>
        <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Filter by Type</h3>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as EventType | 'all')}
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700"
          >
            <option value="all">All Events</option>
            <option value="workshop">Workshops</option>
            <option value="bootcamp">Bootcamps</option>
            <option value="crashcourse">Crash Courses</option>
            <option value="seminar">Seminars</option>
          </select>
        </div>
      </div>
      <div className="lg:w-2/3">
        <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
        <div className="space-y-8">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="h-48 w-full object-cover md:w-48"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-yellow-500 font-semibold">
                    {event.type}
                  </div>
                  <h2 className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white">
                    {event.title}
                  </h2>
                  <p className="mt-2 text-gray-500 dark:text-gray-300">{event.description}</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {event.date.toLocaleDateString()}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <Clock className="mr-2 h-4 w-4" />
                    {event.time}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

