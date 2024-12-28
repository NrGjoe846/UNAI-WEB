'use client'

import { useState } from 'react'
import { useNotifications } from './notifications-provider'

export function Feedback() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const { addNotification } = useNotifications()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', feedback)
    addNotification({ type: 'success', message: 'Thank you for your feedback!' })
    setFeedback('')
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded-full hover:bg-yellow-300 transition-colors"
        >
          Feedback
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback..."
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            rows={4}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

