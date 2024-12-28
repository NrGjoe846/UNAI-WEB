'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { useNotifications } from '@/components/notifications-provider'

export default function ResourceLibrary() {
  const [resources, setResources] = useState([])
  const [categories, setCategories] = useState([])
  const [newResource, setNewResource] = useState({ title: '', description: '', url: '', categoryId: '' })
  const { user } = useAuth()
  const { addNotification } = useNotifications()

  useEffect(() => {
    fetchResources()
    fetchCategories()
  }, [])

  const fetchResources = async () => {
    try {
      const res = await fetch('/api/resources')
      if (!res.ok) throw new Error('Failed to fetch resources')
      const data = await res.json()
      setResources(data)
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to load resources. Please try again.' })
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/resources/categories')
      if (!res.ok) throw new Error('Failed to fetch categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to load categories. Please try again.' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResource),
      })

      if (!res.ok) throw new Error('Failed to create resource')

      addNotification({ type: 'success', message: 'Resource added successfully!' })
      setNewResource({ title: '', description: '', url: '', categoryId: '' })
      fetchResources()
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to add resource. Please try again.' })
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Resource Library</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {resources.map(resource => (
          <div key={resource.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{resource.description}</p>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View Resource
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Category: {resource.category.name}
            </p>
          </div>
        ))}
      </div>

      {user && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Add New Resource</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <input
                type="text"
                id="title"
                value={newResource.title}
                onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                id="description"
                value={newResource.description}
                onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL</label>
              <input
                type="url"
                id="url"
                value={newResource.url}
                onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <select
                id="category"
                value={newResource.categoryId}
                onChange={(e) => setNewResource({ ...newResource, categoryId: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Resource
          </button>
        </form>
      )}
    </div>
  )
}

