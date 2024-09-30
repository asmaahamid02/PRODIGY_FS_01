import React from 'react'
import { nextAuthOptions } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

const Courses = async () => {
  const session = await getServerSession(nextAuthOptions)

  return (
    <div className='space-y-6 text-center'>
      <h1 className='text-3xl font-extrabold '>Courses page</h1>
      <h3>
        Every <b>authenticated</b> user can access this page!
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

export default Courses
