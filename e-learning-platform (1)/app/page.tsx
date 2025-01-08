import { HeroSection } from '@/components/HeroSection'
import { FuturisticCard } from '@/components/ui/FuturisticCard'
import { motion } from 'framer-motion'
import { FaRocket, FaCode, FaBrain, FaChartLine, FaUsers, FaTrophy } from 'react-icons/fa'
import Link from 'next/link'

const features = [
  { icon: FaRocket, title: "Emerging Technologies", description: "Explore AI, blockchain, and more" },
  { icon: FaCode, title: "Programming Mastery", description: "From basics to advanced techniques" },
  { icon: FaBrain, title: "Concept Reinforcement", description: "Strengthen your understanding" },
  { icon: FaChartLine, title: "Track Progress", description: "Visualize your learning journey" },
  { icon: FaUsers, title: "Collaborative Learning", description: "Join study groups and forums" },
  { icon: FaTrophy, title: "Gamified Experience", description: "Earn achievements and level up" },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 gradient-text"
          >
            Future-Ready Learning Experience
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FuturisticCard
                key={index}
                className="p-6"
              >
                <feature.icon className="text-4xl text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </FuturisticCard>
            ))}
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background" />
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"
              animate={{
                x: ["100%", "-100%"],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                delay: i * 5,
              }}
            />
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-8 gradient-text"
          >
            Ready to Begin Your Journey?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-x-4"
          >
            <Link
              href="/register"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 inline-block"
            >
              Get Started
            </Link>
            <Link
              href="/courses"
              className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-gray-700 hover:to-gray-600 transition-all duration-300 hover:scale-105 inline-block"
            >
              Browse Courses
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

