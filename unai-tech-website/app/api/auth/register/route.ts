import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import { getJwtSecretKey } from '@/lib/auth'

// Mock user data
let users = []

export async function POST(request: Request) {
  const { name, email, password } = await request.json()

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Name, email and password are required' }, { status: 400 })
  }

  try {
    const existingUser = users.find(u => u.email === email)

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password // In a real application, this should be hashed
    }

    users.push(newUser)

    const token = await new SignJWT({ userId: newUser.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(getJwtSecretKey())

    const response = NextResponse.json(
      { user: { id: newUser.id, name: newUser.name, email: newUser.email } },
      { status: 201 }
    )

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'strict',
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

