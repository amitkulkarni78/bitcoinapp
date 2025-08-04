import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // In a real application, you would create a new user in the database
    // For now, we'll just simulate a successful signup
    console.log('New user signup:', { email, password })

    return NextResponse.json({ message: 'Signup successful' })
  } catch (_error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
