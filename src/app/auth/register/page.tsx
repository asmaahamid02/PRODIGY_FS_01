'use client'

import GoogleButton from '@/components/GoogleButton'
import InputField from '@/components/InputField'
import PasswordChecklist from '@/components/PasswordChecklist'
import { validateEmail, validatePassword } from '@/lib/utils'
import { ChangeEvent, FormEvent, useMemo, useState } from 'react'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
  })

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  const isFormValid = useMemo(() => {
    return (
      formData.name &&
      formData.email &&
      formData.password &&
      Object.values(passwordValidations).every(Boolean)
    )
  }, [formData, passwordValidations])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Validation logic
    if (name === 'name') {
      setErrors((prev) => ({
        ...prev,
        name: value
          ? value.length < 5
            ? 'Name must be at least 5 characters'
            : ''
          : 'Name is required',
      }))
    }

    if (name === 'email') {
      setErrors((prev) => ({
        ...prev,
        email: value
          ? validateEmail(value)
            ? ''
            : 'Email is not valid'
          : 'Email is required',
      }))
    }

    if (name === 'password') {
      setPasswordValidations(validatePassword(value))
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) {
      if (!formData.name)
        setErrors((prev) => ({ ...prev, name: 'Name is required' }))
      if (!formData.email)
        setErrors((prev) => ({ ...prev, email: 'Email is required' }))
      return
    }

    // Submit logic
    console.log('Registering user:', formData)
  }

  return (
    <div className='w-full max-w-sm mx-auto flex flex-col justify-center items-center bg-white border rounded-lg p-4 space-y-4'>
      <h1 className='text-2xl font-semibold'>Register</h1>
      <form onSubmit={handleSubmit} className='w-full flex flex-col space-y-4'>
        {/* Name Field */}
        <InputField
          label='Name'
          id='name'
          name='name'
          placeholder='Name'
          value={formData.name}
          error={errors.name}
          onChange={handleChange}
        />

        {/* Email Field */}
        <InputField
          label='Email'
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          value={formData.email}
          error={errors.email}
          onChange={handleChange}
        />

        {/* Password Field */}
        <div className='space-y-2 flex flex-col'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            className='border rounded-lg p-2'
            value={formData.password}
            onChange={handleChange}
          />
          <PasswordChecklist validations={passwordValidations} />
        </div>

        <button
          disabled={!isFormValid}
          type='submit'
          className='bg-emerald-500 text-white p-2 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed'
        >
          Login
        </button>
      </form>
      <p className='text-sm'>
        Already have an account?
        <a href='/auth/login' className='text-emerald-500'>
          Login
        </a>
      </p>
      <p className='text-sm text-emerald-500'>or</p>
      <GoogleButton />
    </div>
  )
}

export default Register
