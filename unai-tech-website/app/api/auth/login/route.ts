import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import { getJwtSecretKey } from '@/lib/auth'

const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password456' },
]

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
  }

  try {
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(getJwtSecretKey())

    const response = NextResponse.json(
      { user: { id: user.id, name: user.name, email: user.email } },
      { status: 200 }
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
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

