'use client'
import Loader from '@/components/Loader'
import PrimaryButton from '@/components/PrimaryButton'
import RoleField from '@/components/RoleField'
import { handleError } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const UpdateRole = () => {
  const [role, setRole] = React.useState('student')
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/update-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      toast.success(data.message)

      router.push('/')
    } catch (error: unknown) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full max-w-lg mx-auto flex flex-col justify-center items-center bg-white border rounded-lg p-4 space-y-4'>
      <h1 className='text-2xl font-semibold'>Continue as</h1>
      <form onSubmit={handleSubmit} className='w-full flex flex-col space-y-4'>
        <RoleField role={role} handleChange={(e) => setRole(e.target.value)} />

        <div className='flex justify-end'>
          <PrimaryButton type='submit' disabled={loading}>
            {loading ? <Loader /> : 'Continue'}
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}

export default UpdateRole
