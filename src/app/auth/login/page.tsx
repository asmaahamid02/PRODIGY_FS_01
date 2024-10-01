'use client'
import GoogleButton from '@/components/GoogleButton'
import { handleError } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const Login = () => {
  const [error, setError] = React.useState<string>('')
  const [role, setRole] = React.useState<string>('student')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value

    if (!email || !password) {
      setError('Please fill all the fields')
      return
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error as string)
      }

      console.log(result)

      toast.success('Logged in successfully!')

      router.push('/')
    } catch (error: unknown) {
      handleError(error)
      return
    }
  }

  return (
    <>
      <h1 className='text-2xl font-semibold'>Login</h1>
      <form onSubmit={handleSubmit} className='w-full flex flex-col space-y-4'>
        {error && (
          <span className='text-red-500 text-sm text-center'>{error}</span>
        )}
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          className='border rounded-lg p-2'
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          className='border rounded-lg p-2'
        />

        {/* Role field */}
        <div className='space-y-2 flex flex-col'>
          <label className='text-sm' htmlFor='role'>
            Join as
          </label>
          <select
            name='role'
            id='role'
            className='text-sm border rounded-lg p-2'
            value={role}
            onChange={(e) => setRole(e.currentTarget.value)}
          >
            <option value='instructor'>Instructor</option>
            <option value='student'>Student</option>
          </select>
        </div>

        <button
          type='submit'
          className='bg-emerald-500 text-white p-2 rounded-lg'
        >
          Login
        </button>
      </form>
      <p className='text-sm'>
        Don&apos;t have an account?
        <a href='/auth/register' className='text-emerald-500'>
          Register
        </a>
      </p>
      <p className='text-sm text-emerald-500'>or</p>
      <GoogleButton role={role} />
    </>
  )
}

export default Login
