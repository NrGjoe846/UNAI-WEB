import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

// Mock webinar data
let webinars = []

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session || !session.user.isInstructor) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { topic, start_time, duration } = await request.json()

  try {
    const newWebinar = {
      id: Date.now().toString(),
      topic,
      startTime: new Date(start_time),
      duration,
      zoomMeetingId: 'mock-zoom-id',
      zoomJoinUrl: 'https://zoom.us/j/mock-meeting-id',
      instructorId: session.user.id
    }

    webinars.push(newWebinar)

    return NextResponse.json(newWebinar, { status: 201 })
  } catch (error) {
    console.error('Webinar creation error:', error)
    return NextResponse.json({ message: 'Failed to create webinar' }, { status: 500 })
  }
}

