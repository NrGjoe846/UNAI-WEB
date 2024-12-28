import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

// Mock resources data
let resources = []

export async function GET(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    return NextResponse.json(resources)
  } catch (error) {
    console.error('Resource fetch error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { title, description, url, categoryId } = await request.json()

  try {
    const newResource = {
      id: Date.now().toString(),
      title,
      description,
      url,
      categoryId,
      createdBy: session.user.id
    }
    resources.push(newResource)
    return NextResponse.json(newResource, { status: 201 })
  } catch (error) {
    console.error('Resource creation error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

