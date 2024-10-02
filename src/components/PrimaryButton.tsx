import React from 'react'

const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      className='bg-emerald-500 text-white p-2 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center'
      {...props}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
