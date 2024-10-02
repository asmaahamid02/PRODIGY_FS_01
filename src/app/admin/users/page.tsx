import ErrorPage from '@/app/api/admin/users/error'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

type IUser = {
  _id: string
  name: string
  role: string
  email: string
}

const Users = async () => {
  const cookieStore = cookies()
  const sessionTokenCookie = cookieStore.get('next-auth.session-token')
  const sessionToken = sessionTokenCookie?.value

  const response = await fetch(`${process.env.APP_URL}/api/admin/users`, {
    method: 'GET',
    //important step for server components in order to access the session in the apis
    headers: {
      Cookie: `next-auth.session-token=${sessionToken};path=/;expires=Session`,
    },
    cache: 'no-store',
  })
  const data = await response.json()

  if (!response.ok) {
    if (response.status === 401) {
      redirect('/auth/login?callbackUrl=/admin/users')
    } else if (response.status === 403) {
      redirect('/unauthorized')
    } else {
      return <ErrorPage />
    }
  }

  const users: IUser[] = data.users

  return (
    <div className='relative overflow-x-auto h-full w-full'>
      <h1 className='text-2xl md:text-4xl font-semibold mb-6'>Users</h1>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
        <thead className='text-xs text-gray-800 uppercase bg-gray-50'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Email
            </th>
            <th scope='col' className='px-6 py-3'>
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className='odd:bg-white odd:dark:bg-gray-200 even:bg-gray-50'
            >
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-700 whitespace-nowrap'
              >
                {user.name}
              </th>
              <td className='px-6 py-4'>{user.email}</td>
              <td className='px-6 py-4'>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
