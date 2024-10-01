import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import React from 'react'

const Students = async () => {
  const session = await getServerSession(nextAuthOptions)

  return (
    <div className='space-y-6 text-center'>
      <h1 className='text-3xl font-extrabold '>Students page</h1>
      <h3>
        Only <b>Instructors</b> can access this page!
      </h3>
      {session && (
        <p className='text-lg'>
          Logged in as <span className='font-bold'>{session?.user?.name}</span>{' '}
          with <span className='font-bold'>{session?.user?.email}</span> email
        </p>
      )}
    </div>
  )
}

export default Students
