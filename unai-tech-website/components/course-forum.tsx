'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { useNotifications } from '@/components/notifications-provider'

interface Post {
  id: string
  content: string
  author: {
    name: string
  }
  createdAt: string
  replies: Post[]
}

export default function CourseForum({ courseId }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const { user } = useAuth()
  const { addNotification } = useNotifications()

  useEffect(() => {
    fetchPosts()
  }, [courseId])

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/forums/posts?courseId=${courseId}`)
      if (!res.ok) throw new Error('Failed to fetch posts')
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to load forum posts. Please try again.' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/forums/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, content: newPost }),
      })

      if (!res.ok) throw new Error('Failed to create post')

      setNewPost('')
      fetchPosts()
      addNotification({ type: 'success', message: 'Post created successfully!' })
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to create post. Please try again.' })
    }
  }

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyingTo) return

    try {
      const res = await fetch(`/api/forums/posts/${replyingTo}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent }),
      })

      if (!res.ok) throw new Error('Failed to create reply')

      setReplyContent('')
      setReplyingTo(null)
      fetchPosts()
      addNotification({ type: 'success', message: 'Reply posted successfully!' })
    } catch (error) {
      addNotification({ type: 'error', message: 'Failed to post reply. Please try again.' })
    }
  }

  const renderPost= (post: Post) => (
    <div key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {post.author.name} - {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="mb-4">{post.content}</p>
      {user && (
        <button
          onClick={() => setReplyingTo(post.id)}
          className="text-blue-500 hover:text-blue-600 text-sm"
        >
          Reply
        </button>
      )}
      {replyingTo === post.id && (
        <form onSubmit={handleReply} className="mt-4">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            rows={3}
            placeholder="Write your reply here..."
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Post Reply
          </button>
        </form>
      )}
      {post.replies && post.replies.length > 0 && (
        <div className="ml-8 mt-4">
          {post.replies.map(renderPost)}
        </div>
      )}
    </div>
  )

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Discussion Forum</h2>
      <div className="space-y-4 mb-4">
        {posts.map(renderPost)}
      </div>
      {user && (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            rows={3}
            placeholder="Write your post here..."
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

