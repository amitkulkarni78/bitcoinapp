import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // In a real application, you would validate the credentials against a database
    if (email === 'test@example.com' && password === 'password') {
      // For simplicity, we're returning a dummy token
      const token = 'dummy-auth-token'
      return NextResponse.json({ token })
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (_error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
