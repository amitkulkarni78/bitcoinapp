'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface Message {
  id: string
  content: string
  sender: string
  timestamp: string
}

export default function ChatRoom() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Here you would typically connect to your WebSocket or real-time service
    // For now, we'll simulate some initial messages
    setMessages([
      {
        id: '1',
        content: 'Welcome to the chat room!',
        sender: 'System',
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage('')

    // Here you would typically send the message to your backend
    // For now, we'll just add it to the local state
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Chat Room</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Back to Dashboard
            </button>
          </div>

          {/* Chat Messages */}
          <div className="bg-gray-800 rounded-lg p-4 h-[600px] overflow-y-auto mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.sender === 'You'
                    ? 'text-right'
                    : message.sender === 'System'
                    ? 'text-center text-gray-400'
                    : ''
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === 'You'
                      ? 'bg-blue-600'
                      : message.sender === 'System'
                      ? 'bg-gray-700'
                      : 'bg-gray-700'
                  }`}
                >
                  {message.sender !== 'System' && (
                    <div className="text-sm text-gray-300 mb-1">
                      {message.sender}
                    </div>
                  )}
                  <div>{message.content}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  )
} 