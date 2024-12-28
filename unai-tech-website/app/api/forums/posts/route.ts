import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

// Mock forum posts data
let forumPosts: { id: string; courseId: string; content: string; authorId: string; authorName: string; createdAt: Date }[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const { courseId } = req.query

    try {
      const posts = forumPosts.filter(post => post.courseId === courseId)
      res.status(200).json(posts)
    } catch (error) {
      console.error('Forum posts fetch error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else if (req.method === 'POST') {
    const { courseId, content } = req.body

    try {
      const newPost = {
        id: Date.now().toString(),
        courseId,
        content,
        authorId: session.user.id,
        authorName: session.user.name,
        createdAt: new Date()
      }
      forumPosts.push(newPost)
      res.status(201).json(newPost)
    } catch (error) {
      console.error('Forum post creation error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

