import React from 'react'

export default async function Home() {
  return (
    <div className='space-y-6 text-center'>
      <h1 className='text-3xl font-extrabold '>Home page</h1>
      <h3 className='text-xl font-medium'>
        This is a <b>public</b> route. Every one can access it!
      </h3>
    </div>
  )
}
