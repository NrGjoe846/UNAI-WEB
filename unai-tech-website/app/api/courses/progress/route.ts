import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

// Mock course progress data
let courseProgress: { userId: string; courseId: string; progress: number; completedLessons: string[] }[] = []

export async function GET(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const courseId = searchParams.get('courseId')

  const progress = courseProgress.find(p => p.userId === session.user.id && p.courseId === courseId)
  return NextResponse.json(progress || { progress: 0, completedLessons: [] })
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { courseId, lessonId } = await request.json()

  try {
    let existingProgress = courseProgress.find(p => p.userId === session.user.id && p.courseId === courseId)
    
    if (existingProgress) {
      if (!existingProgress.completedLessons.includes(lessonId)) {
        existingProgress.completedLessons.push(lessonId)
        existingProgress.progress = (existingProgress.completedLessons.length / 10) * 100 // Assuming 10 lessons per course
      }
    } else {
      existingProgress = {
        userId: session.user.id,
        courseId,
        progress: 10, // 1 out of 10 lessons completed
        completedLessons: [lessonId]
      }
      courseProgress.push(existingProgress)
    }

    return NextResponse.json(existingProgress)
  } catch (error) {
    console.error('Course progress update error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

