import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const GoogleButton = () => {
  return (
    <button
      className='border rounded-lg px-4 py-2 flex gap-1 items-center w-full justify-center'
      onClick={() => signIn('google')}
    >
      <Image src='/icons/google.svg' alt='Google' width={20} height={20} />
      <span>Continue with Google</span>
    </button>
  )
}

export default GoogleButton
