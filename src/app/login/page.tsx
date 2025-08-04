'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { apiRoutes, pageRoutes } from '@/lib/constants'
import api from '@/lib/api'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormInputs = z.infer<typeof loginSchema>

export default function Login() {
  const router = useRouter()
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormInputs) => {
    setApiError(null)
    try {
      await api.post(apiRoutes.login, data)
      router.push(pageRoutes.dashboard)
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

          {apiError && (
            <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" fullWidth disabled={isSubmitting} variant="primary">
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="mt-4 text-center text-gray-400">
            Don&apos;t have an account?{' '}
            <Link
              href={pageRoutes.signup}
              className="text-blue-400 hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}