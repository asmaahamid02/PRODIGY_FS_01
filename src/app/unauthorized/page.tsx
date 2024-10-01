import React from 'react'

const Unauthorized = async () => {
  return (
    <div className='space-y-6 text-center'>
      <h1 className='text-3xl font-extrabold text-red-700'>
        Unauthorized page
      </h1>
      <p className='text-lg'>Your role is not authorized to access this page</p>
    </div>
  )
}

export default Unauthorized
