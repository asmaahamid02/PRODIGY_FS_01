'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const { data: session } = useSession()

  return (
    <header className='shrink-0 bg-emerald-700 text-white px-6 md:px-8 py-4 flex items-center shadow-lg sticky w-full top-0 h-16'>
      <nav className='flex justify-between gap-4 items-center w-full'>
        <Link
          href={'/'}
          className='text-xl md:text-2xl font-extrabold tracking-tight'
        >
          SecureMe
        </Link>
        <nav className='flex items-center gap-6'>
          <Link className='font-medium hover:underline' href={'/'}>
            Home
          </Link>
          <Link className='font-medium hover:underline' href={'/courses'}>
            Courses
          </Link>
          <Link className='font-medium hover:underline' href={'/admin/users'}>
            Users
          </Link>
          <Link
            className='font-medium hover:underline'
            href={'/instructor/students'}
          >
            Students
          </Link>
          <Link
            className='font-medium hover:underline'
            href={'/student/schedule'}
          >
            Schedule
          </Link>
          {session ? (
            <button
              className='font-medium hover:underline'
              onClick={() =>
                signOut({ callbackUrl: '/auth/login?callbackUrl=/' })
              }
            >
              Logout
            </button>
          ) : (
            <button
              className='font-medium hover:underline'
              onClick={() => signIn()}
            >
              Login
            </button>
          )}
        </nav>
      </nav>
    </header>
  )
}

export default Header
