"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FuturisticCard } from '@/components/ui/FuturisticCard'
import { FaPlay, FaSave, FaCog, FaDownload, FaShare, FaLightbulb, FaQuestionCircle } from 'react-icons/fa'
import Editor from '@monaco-editor/react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const themes = {
  cyberpunk: {
    name: 'Cyberpunk',
    background: '#2d2d2d',
    foreground: '#00ff9f',
    accent: '#ff00ff'
  },
  quantum: {
    name: 'Quantum',
    background: '#1a1a2e',
    foreground: '#0abdc6',
    accent: '#ea00d9'
  },
  neon: {
    name: 'Neon',
    background: '#2b213a',
    foreground: '#ff7edb',
    accent: '#00ff9f'
  }
}

const sampleChallenges = [
  {
    id: 1,
    title: "Fibonacci Sequence",
    description: "Create a function that returns the nth number in the Fibonacci sequence.",
    template: `function fibonacci(n) {
  // Your code here
}

// Test cases
console.log(fibonacci(5)) // Should return 5
console.log(fibonacci(8)) // Should return 21`,
    difficulty: "medium",
    solution: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Test cases
console.log(fibonacci(5)) // Should return 5
console.log(fibonacci(8)) // Should return 21`
  },
  {
    id: 2,
    title: "Array Manipulation",
    description: "Write a function that finds the missing number in an array of consecutive numbers.",
    template: `function findMissingNumber(arr) {
  // Your code here
}

// Test cases
console.log(findMissingNumber([1, 2, 4, 5])) // Should return 3
console.log(findMissingNumber([1, 3, 4, 5])) // Should return 2`,
    difficulty: "easy",
    solution: `function findMissingNumber(arr) {
  const n = arr.length + 1;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}

// Test cases
console.log(findMissingNumber([1, 2, 4, 5])) // Should return 3
console.log(findMissingNumber([1, 3, 4, 5])) // Should return 2`
  }
]

export default function CodePlayground() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [theme, setTheme] = useState('cyberpunk')
  const [language, setLanguage] = useState('javascript')
  const [fontSize, setFontSize] = useState(14)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null)
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    // Set initial code
    setCode(sampleChallenges[0].template)
    setSelectedChallenge(sampleChallenges[0])
  }, [])

  const handleRunCode = () => {
    try {
      // Create a new Function from the code string and execute it
      const result = new Function(code)()
      setOutput(String(result))
    } catch (error: any) {
      setOutput(`Error: ${error.message}`)
    }
  }

  const handleSaveCode = () => {
    // Save code to localStorage
    localStorage.setItem('savedCode', code)
    setOutput('Code saved successfully!')
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'code.js'
    a.click()
  }

  const handleShare = () => {
    navigator.clipboard.writeText(code)
    setOutput('Code copied to clipboard!')
  }

  const handleChallengeSelect = (challenge: any) => {
    setSelectedChallenge(challenge)
    setCode(challenge.template)
    setShowHint(false)
    setShowSolution(false)
  }

  return (
    <div className="min-h-screen p-8 relative">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold gradient-text">
          Code Playground
        </motion.h1>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full bg-gray-800 text-white"
          >
            <FaCog className="text-xl" />
          </motion.button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Challenges Panel */}
        <FuturisticCard className="p-6">
          <h2 className="text-2xl font-bold mb-4">Challenges</h2>
          <div className="space-y-4">
            {sampleChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedChallenge?.id === challenge.id
                    ? 'bg-purple-900/30'
                    : 'bg-gray-800/50 hover:bg-gray-800'
                }`}
                onClick={() => handleChallengeSelect(challenge)}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-bold mb-2">{challenge.title}</h3>
                <p className="text-sm text-gray-400">{challenge.description}</p>
                <span className={`text-xs mt-2 inline-block px-2 py-1 rounded ${
                  challenge.difficulty === 'easy' ? 'bg-green-900/50 text-green-400' :
                  challenge.difficulty === 'medium' ? 'bg-yellow-900/50 text-yellow-400' :
                  'bg-red-900/50 text-red-400'
                }`}>
                  {challenge.difficulty}
                </span>
              </motion.div>
            ))}
          </div>
        </FuturisticCard>

        {/* Code Editor */}
        <div className="md:col-span-2 space-y-4">
          <FuturisticCard className="p-6">
            <Editor
              height="400px"
              defaultLanguage="javascript"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                fontSize: fontSize,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                lineNumbers: 'on',
                glyphMargin: false,
                folding: true,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 3,
              }}
            />
            <div className="flex justify-between mt-4">
              <div className="space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRunCode}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center space-x-2"
                >
                  <FaPlay />
                  <span>Run</span>
                </motion.button>
              </div>
              <div className="space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveCode}
                  className="px-4 py-2 rounded-full bg-gray-800 text-white"
                >
                  <FaSave />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-full bg-gray-800 text-white"
                >
                  <FaDownload />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="px-4 py-2 rounded-full bg-gray-800 text-white"
                >
                  <FaShare />
                </motion.button>
              </div>
            </div>
          </FuturisticCard>

          <FuturisticCard className="p-6">
            <h2 className="text-xl font-bold mb-2">Output</h2>
            <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-[200px]">
              {output || 'Run your code to see the output'}
            </pre>
          </FuturisticCard>

          {selectedChallenge && (
            <div className="flex space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <FaLightbulb />
                    <span>Hint</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Hint for {selectedChallenge.title}</DialogTitle>
                    <DialogDescription>
                      {showHint ? (
                        <p>{selectedChallenge.hint || "No hint available for this challenge."}</p>
                      ) : (
                        <Button onClick={() => setShowHint(true)}>Reveal Hint</Button>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <FaQuestionCircle />
                    <span>Solution</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Solution for {selectedChallenge.title}</DialogTitle>
                    <DialogDescription>
                      {showSolution ? (
                        <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-[400px]">
                          {selectedChallenge.solution}
                        </pre>
                      ) : (
                        <Button onClick={() => setShowSolution(true)}>Reveal Solution</Button>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
          >
            <FuturisticCard className="p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 rounded-lg"
                  >
                    {Object.keys(themes).map((themeName) => (
                      <option key={themeName} value={themeName}>
                        {themes[themeName as keyof typeof themes].name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 rounded-lg"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Font Size</label>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-400">{fontSize}px</span>
                </div>
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </FuturisticCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

