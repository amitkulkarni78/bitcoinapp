'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    name: 'User',
    email: 'user@example.com',
  })

  useEffect(() => {
    // Here you would typically fetch user data from your API
    // For now, we'll use mock data
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile')
        if (response.ok) {
          const data = await response.json()
          setUserData(data)
        }
      } catch (error) {
        console.error('Failed to fetch user data')
      }
    }

    fetchUserData()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      router.push('/login')
    } catch (error) {
      console.error('Logout failed')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="space-y-2">
              <p><span className="text-gray-400">Name:</span> {userData.name}</p>
              <p><span className="text-gray-400">Email:</span> {userData.email}</p>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/chatroom"
                className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition duration-300"
              >
                Go to Chat Room
              </Link>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition duration-300">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <div className="space-y-2">
              <p><span className="text-gray-400">Last Login:</span> Just now</p>
              <p><span className="text-gray-400">Account Status:</span> Active</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 