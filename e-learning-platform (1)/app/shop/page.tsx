"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FuturisticCard } from '@/components/ui/FuturisticCard'
import { FaCoins, FaRobot, FaPalette, FaRocket, FaCrown, FaGem } from 'react-icons/fa'

const shopCategories = [
  {
    id: 'avatars',
    name: 'Avatar Skins',
    items: [
      { id: 1, name: "Cyber Ninja", description: "A sleek, futuristic ninja avatar", price: 1000, icon: FaRobot, rarity: "rare" },
      { id: 2, name: "Space Explorer", description: "An astronaut-themed avatar", price: 800, icon: FaRocket, rarity: "uncommon" },
      { id: 3, name: "Tech Mage", description: "A mystical tech-enhanced character", price: 1500, icon: FaCrown, rarity: "legendary" },
    ]
  },
  {
    id: 'themes',
    name: 'UI Themes',
    items: [
      { id: 4, name: "Neon Dreams", description: "Vibrant neon color scheme", price: 500, icon: FaPalette, rarity: "uncommon" },
      { id: 5, name: "Dark Matter", description: "Sleek dark theme with particle effects", price: 1000, icon: FaGem, rarity: "rare" },
      { id: 6, name: "Quantum", description: "Interactive quantum-inspired theme", price: 2000, icon: FaCrown, rarity: "legendary" },
    ]
  }
]

const rarityColors = {
  common: "text-gray-400",
  uncommon: "text-green-400",
  rare: "text-blue-400",
  legendary: "text-purple-400"
}

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('avatars')
  const [userCoins, setUserCoins] = useState(1500)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const handlePurchase = (item: any) => {
    if (userCoins >= item.price) {
      setSelectedItem(item)
      setShowPurchaseModal(true)
    }
  }

  const confirmPurchase = () => {
    setUserCoins(userCoins - selectedItem.price)
    setShowPurchaseModal(false)
    // Here you would typically update the user's inventory
  }

  return (
    <div className="min-h-screen p-8 relative">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-background to-background" />
      </div>

      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold gradient-text"
          >
            TechShop
          </motion.h1>
          <FuturisticCard className="px-4 py-2">
            <div className="flex items-center space-x-2">
              <FaCoins className="text-yellow-400" />
              <span className="text-xl font-bold">{userCoins}</span>
            </div>
          </FuturisticCard>
        </div>

        {/* Category Selection */}
        <div className="flex justify-center mb-8 space-x-4">
          {shopCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Shop Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {shopCategories
              .find(cat => cat.id === selectedCategory)
              ?.items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <FuturisticCard className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full bg-gray-800`}>
                        <item.icon className={`text-2xl ${rarityColors[item.rarity as keyof typeof rarityColors]}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                        <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${rarityColors[item.rarity as keyof typeof rarityColors]} capitalize`}>
                            {item.rarity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePurchase(item)}
                            className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
                              userCoins >= item.price
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={userCoins < item.price}
                          >
                            <FaCoins className="text-yellow-400" />
                            <span>{item.price}</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </FuturisticCard>
                </motion.div>
              ))
            }
          </AnimatePresence>
        </div>

        {/* Purchase Modal */}
        <AnimatePresence>
          {showPurchaseModal && selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
            >
              <FuturisticCard className="p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Confirm Purchase</h2>
                <p className="text-gray-400 mb-4">
                  Are you sure you want to purchase {selectedItem.name} for {selectedItem.price} coins?
                </p>
                <div className="flex justify-end space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPurchaseModal(false)}
                    className="px-4 py-2 rounded-full bg-gray-700 text-white"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmPurchase}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  >
                    Confirm
                  </motion.button>
                </div>
              </FuturisticCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

