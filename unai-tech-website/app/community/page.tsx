'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react'

const posts = [
  {
    id: 1,
    author: 'Jane Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'Just completed the AI Fundamentals course! Excited to apply what I've learned in my next project. #AILearning #UNAITECH',
    likes: 24,
    comments: 5,
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    author: 'John Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    content: 'Looking for study partners for the upcoming Machine Learning Basics workshop. Anyone interested? #MLStudyGroup',
    likes: 18,
    comments: 7,
    timestamp: '5 hours ago',
  },
  {
    id: 3,
    author: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    content: 'Check out this amazing AI project I built using skills from the Deep Learning with PyTorch course! [Link to project]',
    likes: 42,
    comments: 12,
    timestamp: '1 day ago',
  },
]

export default function Community() {
  const [newPost, setNewPost] = useState('')

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the new post to your backend
    console.log('New post:', newPost)
    setNewPost('')
  }

  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-8">Community</h1>

      <div className="mb-8">
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts, questions, or achievements..."
            className="w-full p-4 bg-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows={4}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors"
          >
            Post
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6"
          >
            <div className="flex items-center mb-4">
              <Image
                src={post.avatar}
                alt={post.author}
                width={40}
                height={40}
                className="rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-gray-400">{post.timestamp}</p>
              </div>
            </div>
            <p className="mb-4">{post.content}</p>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

