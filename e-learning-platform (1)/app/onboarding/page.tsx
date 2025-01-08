"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StarfieldBackground from '@/components/StarfieldBackground'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const steps = [
  { title: "Welcome, Space Cadet!", description: "Prepare to embark on an epic coding adventure across the galaxy." },
  { title: "Choose Your Path", description: "Select your primary learning track to begin your journey." },
  { title: "Craft Your Avatar", description: "Create your digital alter ego for the Cosmic Code Academy." },
  { title: "Mission Briefing", description: "Get ready for your first coding quest in the vast universe of technology." },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [username, setUsername] = useState('')
  const [selectedTrack, setSelectedTrack] = useState('')

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Handle onboarding completion
      console.log('Onboarding completed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <StarfieldBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-2xl"
      >
        <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg neon-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-center text-white mb-6 neon-text">{steps[currentStep].title}</h1>
              <p className="text-gray-300 text-center mb-8">{steps[currentStep].description}</p>
              
              {currentStep === 0 && (
                <Input
                  label="Choose your cosmic codename"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. StarCoder42"
                />
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <Button
                    variant={selectedTrack === 'python' ? 'primary' : 'secondary'}
                    onClick={() => setSelectedTrack('python')}
                    className="w-full"
                  >
                    Python: The Serpent's Path
                  </Button>
                  <Button
                    variant={selectedTrack === 'javascript' ? 'primary' : 'secondary'}
                    onClick={() => setSelectedTrack('javascript')}
                    className="w-full"
                  >
                    JavaScript: The Cosmic Web
                  </Button>
                  <Button
                    variant={selectedTrack === 'ai' ? 'primary' : 'secondary'}
                    onClick={() => setSelectedTrack('ai')}
                    className="w-full"
                  >
                    AI: The Sentient Frontier
                  </Button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="text-center text-white">
                  <p className="mb-4">Choose your avatar's appearance:</p>
                  <div className="flex justify-center space-x-4">
                    <Button onClick={() => console.log('Avatar 1 selected')}>
                      👨‍🚀
                    </Button>
                    <Button onClick={() => console.log('Avatar 2 selected')}>
                      👩‍🚀
                    </Button>
                    <Button onClick={() => console.log('Avatar 3 selected')}>
                      🤖
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="text-center text-white">
                  <p>Prepare for liftoff, {username}!</p>
                  <p className="mt-4">Your chosen path: {selectedTrack}</p>
                  <p className="mt-4">Your first mission awaits in the vast cosmos of code.</p>
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <Button onClick={handleNext} className="animate-pulse">
                  {currentStep < steps.length - 1 ? "Next" : "Launch Your Journey"}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

