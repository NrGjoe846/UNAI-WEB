import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

// Mock gamification data
let userGamification = []

export async function GET(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const userStats = userGamification.find(ug => ug.userId === session.user.id)
    return NextResponse.json(userStats || { points: 0, achievements: [] })
  } catch (error) {
    console.error('Gamification data fetch error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { points, achievementId } = await request.json()

  try {
    let userStats = userGamification.find(ug => ug.userId === session.user.id)
    
    if (userStats) {
      userStats.points += points
      if (achievementId && !userStats.achievements.includes(achievementId)) {
        userStats.achievements.push(achievementId)
      }
    } else {
      userStats = {
        userId: session.user.id,
        points: points,
        achievements: achievementId ? [achievementId] : []
      }
      userGamification.push(userStats)
    }

    return NextResponse.json(userStats)
  } catch (error) {
    console.error('Gamification update error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

