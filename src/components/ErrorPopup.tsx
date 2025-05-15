'use client'

import { useRouter } from 'next/navigation'

interface ErrorPopupProps {
  error: Error
  onClose: () => void
}

export default function ErrorPopup({ error, onClose }: ErrorPopupProps) {
  const router = useRouter()

  const handleClose = () => {
    onClose()
    router.push('/')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-red-500">Error</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="text-gray-300 mb-6">
          <p className="mb-2">An error occurred:</p>
          <p className="bg-gray-700 p-3 rounded text-sm font-mono">
            {error.message}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Return to Home
        </button>
      </div>
    </div>
  )
} 