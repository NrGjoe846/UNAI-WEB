import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Award, BookOpen, Search } from 'lucide-react'
import { useNotifications } from '@/components/notifications-provider'
import { LoadingSpinner } from '@/components/loading-spinner'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/search`)
  const courses = await res.json()
  return { props: { initialCourses: courses } }
}

export default function Courses({ initialCourses }) {
  const [courses, setCourses] = useState(initialCourses)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { addNotification } = useNotifications()

  useEffect(() => {
    // fetchCourses() //Removed as data is fetched on server side
  }, [])

  const fetchCourses = async (search = '') => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/courses/search?query=${search}`)
      if (!res.ok) throw new Error('Failed to fetch courses')
      const data = await res.json()
      setCourses(data)
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to load courses. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchCourses(searchTerm)
  }

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">Our Courses</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </form>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden"
            >
              <Image
                src={course.image || '/placeholder.svg?height=200&width=400'}
                alt={course.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-yellow-400" />
                    <span className="text-sm">{course.duration || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1 text-yellow-400" />
                    <span className="text-sm">{course.level || 'All Levels'}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    <span className="text-sm">{course.rating || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/courses/${course.id}`}
                    className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors"
                  >
                    Enroll Now
                  </Link>
                  <button
                    className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Quick Quiz
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

