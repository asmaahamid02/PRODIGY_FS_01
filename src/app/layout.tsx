import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import AuthProvider from './AuthProvider'
import { Toaster } from 'react-hot-toast'
import { Session } from 'next-auth'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SecureMe',
  description: 'Role-Based secure authentication app',
}

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode
  session: Session
}>) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.variable} antialiased min-h-screen w-full flex flex-col bg-gray-50 text-gray-800`}
      >
        <AuthProvider session={session}>
          <Header />
          <main className='flex-1 w-full flex p-6'>
            <div className='w-full max-w-3xl mx-auto flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-4'>
              {children}
            </div>
          </main>
          <Toaster position='bottom-right' />
        </AuthProvider>
      </body>
    </html>
  )
}
