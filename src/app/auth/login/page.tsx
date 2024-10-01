'use client'
import GoogleButton from '@/components/GoogleButton'
import React from 'react'

const Login = () => {
  const [error, setError] = React.useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value

    if (!email || !password) {
      setError('Please fill all the fields')
      return
    }

    setError('')

    console.log('Login with email: ', email, ' and password: ', password)
  }

  return (
    <div className='w-full max-w-sm mx-auto flex flex-col justify-center items-center bg-white border rounded-lg p-4 space-y-4'>
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
      <GoogleButton />
    </div>
  )
}

export default Login
