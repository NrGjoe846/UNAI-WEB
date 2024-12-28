'use client'

import React, { createContext, useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Notification {
  id: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}

interface NotificationsContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications((prev) => [...prev, { ...notification, id }])
    setTimeout(() => removeNotification(id), 5000) // Auto-remove after 5 seconds
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className={`mb-2 p-4 rounded-lg shadow-lg flex items-center justify-between ${
                notification.type === 'info'
                  ? 'bg-blue-500'
                  : notification.type === 'success'
                  ? 'bg-green-500'
                  : notification.type === 'warning'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            >
              <p className="text-white">{notification.message}</p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-4 text-white hover:text-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return context
}

export default NotificationsProvider

