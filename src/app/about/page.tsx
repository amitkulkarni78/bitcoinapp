export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About Us</h1>
          <div className="space-y-6 text-gray-300">
            <p>
              Welcome to our platform, where we prioritize security, performance, and user experience.
              Our application is built with modern technologies to provide you with the best possible service.
            </p>
            <p>
              We use Next.js, TypeScript, and Tailwind CSS to create a robust and scalable application
              that meets the highest standards of web development.
            </p>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Our Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Secure Authentication System</li>
                <li>Real-time Chat Functionality</li>
                <li>Protected Dashboard</li>
                <li>Modern UI/UX Design</li>
                <li>Responsive Layout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 