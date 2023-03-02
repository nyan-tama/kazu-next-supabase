import type { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { useState, FormEvent } from 'react'
import { BadgeCheckIcon, ShieldCheckIcon } from '@heroicons/react/solid'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { spawn } from 'child_process'

const Auth: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  } = useMutateAuth()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      registerMutation.mutate()
    }
  }

  return (
    <>
      <Layout title="Auth">
        <ShieldCheckIcon className="mb-6 h-12 w-12 text-blue-500" />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              required
              className="border-query-300 my-2 rounded border px-3 py-2 text-sm placeholder-gray-500 focus:border-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              required
              className="border-query-300 my-2 rounded border px-3 py-2 text-sm placeholder-gray-500 focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-6 flex items-center justify-center text-sm">
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="cursor-pointer font-medium hover:text-indigo-500"
            >
              change mode ?
            </span>
          </div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-indigo-500 py-2 px-4 text-sm font-medium text-white"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <BadgeCheckIcon className="h-5 w-5" />
            </span>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </Layout>
    </>
  )
}

export default Auth
