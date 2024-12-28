import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

// Mock learning path data
let learningPaths = []

export async function GET(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const learningPath = learningPaths.find(lp => lp.userId === session.user.id)
    return NextResponse.json(learningPath || { courses: [] })
  } catch (error) {
    console.error('Learning path fetch error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { courseIds } = await request.json()

  try {
    let learningPath = learningPaths.find(lp => lp.userId === session.user.id)
    
    if (learningPath) {
      learningPath.courses = courseIds
    } else {
      learningPath = {
        userId: session.user.id,
        courses: courseIds
      }
      learningPaths.push(learningPath)
    }

    return NextResponse.json(learningPath)
  } catch (error) {
    console.error('Learning path update error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

