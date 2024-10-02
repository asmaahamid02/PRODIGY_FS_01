'use client'

import GoogleButton from '@/components/GoogleButton'
import InputField from '@/components/InputField'
import Loader from '@/components/Loader'
import PasswordChecklist from '@/components/PasswordChecklist'
import PrimaryButton from '@/components/PrimaryButton'
import RoleField from '@/components/RoleField'
import { handleError, validateEmail, validatePassword } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const initialFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'instructor',
}

const initialErrors = {
  name: '',
  email: '',
  confirmPassword: '',
  general: '',
}

const initialPasswordValidations = {
  length: false,
  uppercase: false,
  lowercase: false,
  number: false,
  special: false,
}

const Register = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(initialErrors)
  const [passwordValidations, setPasswordValidations] = useState(
    initialPasswordValidations
  )
  const [loading, setLoading] = useState(false)

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

    setLoading(true)

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

      setLoading(false)
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

      if (result?.error) {
        throw new Error(result.error as string)
      }

      toast.success('Registered successfully!')

      router.push('/courses')
    } catch (error: unknown) {
      handleError(error)
      return
    } finally {
      setLoading(false)
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
        <RoleField role={formData.role} handleChange={handleChange} />

        <PrimaryButton type='submit' disabled={loading}>
          {loading ? <Loader /> : 'Register'}
        </PrimaryButton>
      </form>
      <p className='text-sm'>
        Already have an account?
        <a href='/auth/login' className='text-emerald-500'>
          Login
        </a>
      </p>
      <p className='text-sm text-emerald-500'>or</p>
      <GoogleButton />
    </>
  )
}

export default Register
