import React from 'react'

type TProps = {
  label: string
  id: string
  name: string
  type?: string
  placeholder?: string
  value: string
  error: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({ label, error, ...props }: TProps) => (
  <div className='space-y-2 flex flex-col'>
    <label htmlFor={props.id}>{label}</label>
    <input className='border rounded-lg p-2' {...props} />
    {error && <span className='pl-2 text-xs text-red-500'>{error}</span>}
  </div>
)

export default InputField
