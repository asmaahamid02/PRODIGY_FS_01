import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(nextAuthOptions)

  if (session) {
    redirect('/')
  }

  return (
    <div className='w-full max-w-lg mx-auto flex flex-col justify-center items-center bg-white border rounded-lg p-4 space-y-4'>
      {children}
    </div>
  )
}
