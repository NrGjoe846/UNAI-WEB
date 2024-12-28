'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Play, ChevronRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-4rem)] rounded-3xl overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.pixabay.com/vimeo/328240476/ai-23569.mp4?width=1280&hash=4e8c5a1a4f7d5c9c3c9f3c3c3c3c3c3c3c3c3c3c" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-2xl"
          >
            Empowering the Next Generation with Gamified AI Learning
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl mb-8 max-w-2xl"
          >
            Join our interactive workshops and courses to upskill in AI and build a brighter future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/courses" className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors text-center">
              Explore Courses
            </Link>
            <Link href="/about" className="px-6 py-3 bg-white/20 backdrop-blur-md font-semibold rounded-full hover:bg-white/30 transition-colors text-center">
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Workshop */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Featured Workshop</h2>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-6 sm:gap-8"
        >
          <Image
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="BioPython Basics"
            width={500}
            height={300}
            className="w-full md:w-1/3 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Learn BioPython Basics!</h3>
            <p className="text-gray-300 mb-4">
              A one-day hands-on workshop for beginners in AI and coding. Dive into the world of biological data analysis using Python.
            </p>
            <ul className="mb-4 space-y-2 text-sm sm:text-base">
              <li>• Introduction to Python for bioinformatics</li>
              <li>• Working with DNA and protein sequences</li>
              <li>• Analyzing genomic data</li>
              <li>• Building phylogenetic trees</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/workshops/biopython-basics" className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors">
                <Play className="w-4 h-4" /> Watch Preview
              </Link>
              <Link href="/workshops/biopython-basics/enroll" className="px-4 py-2 bg-white/20 backdrop-blur-md font-semibold rounded-full hover:bg-white/30 transition-colors text-center">
                Enroll Now
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Continue Learning */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Continue Learning</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'AI Fundamentals', progress: 40, image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" },
            { title: 'Machine Learning Basics', progress: 60, image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
            { title: 'Deep Learning with PyTorch', progress: 20, image: "https://images.unsplash.com/photo-1522050212171-61b01dd24579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80" },
          ].map((course) => (
            <motion.div
              key={course.title}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4"
            >
              <Image
                src={course.image}
                alt={course.title}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold mb-2">{course.title}</h3>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <Link href={`/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`} className="w-full py-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors block text-center">
                Resume
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recommended Courses */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Future Forge 5.0', level: 'Intermediate', image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
            { title: 'AI for Commerce', level: 'Beginner', image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
            { title: 'Python for Data Science', level: 'Advanced', image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
          ].map((course) => (
            <motion.div
              key={course.title}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4"
            >
              <Image
                src={course.image}
                alt={course.title}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold mb-2">{course.title}</h3>
              <span className="inline-block bg-yellow-400/20 text-yellow-400 text-xs px-2 py-1 rounded-full mb-4">
                {course.level}
              </span>
              <Link href={`/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`} className="w-full py-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                View Details <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Upcoming Events</h2>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold mb-2">Discover Our Latest Events</h3>
          <p className="text-gray-300 mb-4">
            Join our workshops, bootcamps, and seminars to enhance your AI skills and network with industry professionals.
          </p>
          <Link href="/events" className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors inline-block">
            View All Events
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

