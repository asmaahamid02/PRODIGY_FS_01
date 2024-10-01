'use client'

import GoogleButton from '@/components/GoogleButton'
import InputField from '@/components/InputField'
import PasswordChecklist from '@/components/PasswordChecklist'
import { handleError, validateEmail, validatePassword } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'instructor',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    confirmPassword: '',
    general: '',
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

  const router = useRouter()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

    if (name === 'confirmPassword') {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value !== formData.password ? 'Passwords do not match' : '',
      }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) {
      if (!formData.name)
        setErrors((prev) => ({ ...prev, name: 'Name is required' }))
      if (!formData.email)
        setErrors((prev) => ({ ...prev, email: 'Email is required' }))
      if (!formData.confirmPassword)
        setErrors((prev) => ({
          ...prev,
          confirmPassword: 'Please confirm your password',
        }))
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      console.log(result)

      if (result?.error) {
        throw new Error(result.error as string)
      }

      toast.success('Registered successfully!')

      router.push('/')
    } catch (error: unknown) {
      handleError(error)
      return
    }
  }

  return (
    <>
      <h1 className='text-2xl font-semibold'>Register</h1>
      {errors.general && (
        <span className='text-red-500 text-sm text-center'>
          {errors.general}
        </span>
      )}
      <form onSubmit={handleSubmit} className='w-full flex flex-col space-y-4'>
        <div className='flex gap-2'>
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
        </div>

        <div className='space-y-2'>
          <div className='flex gap-2'>
            {/* Password Field */}
            <div className='space-y-2 flex-1 flex flex-col'>
              <label className='text-sm' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                className='text-sm border rounded-lg p-2'
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Password confirmation */}
            <InputField
              label='Confirm Password'
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <PasswordChecklist validations={passwordValidations} />
        </div>

        {/* Role field */}
        <div className='space-y-2 flex flex-col'>
          <label className='text-sm' htmlFor='role'>
            Join as
          </label>
          <select
            name='role'
            id='role'
            className='text-sm border rounded-lg p-2'
            value={formData.role}
            onChange={handleChange}
          >
            <option value='instructor'>Instructor</option>
            <option value='student'>Student</option>
          </select>
        </div>

        <button
          disabled={!isFormValid}
          type='submit'
          className='bg-emerald-500 text-white p-2 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed'
        >
          Register
        </button>
      </form>
      <p className='text-sm'>
        Already have an account?
        <a href='/auth/login' className='text-emerald-500'>
          Login
        </a>
      </p>
      <p className='text-sm text-emerald-500'>or</p>
      <GoogleButton role={formData.role} />
    </>
  )
}

export default Register
