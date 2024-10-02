import React, { ChangeEvent } from 'react'

const RoleField = ({
  role,
  handleChange,
}: {
  role: string
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
}) => {
  return (
    <div className='space-y-2 flex flex-col'>
      <label className='text-sm' htmlFor='role'>
        Join as
      </label>
      <select
        name='role'
        id='role'
        className='text-sm border rounded-lg p-2'
        value={role}
        onChange={handleChange}
      >
        <option value='instructor'>Instructor</option>
        <option value='student'>Student</option>
      </select>
    </div>
  )
}

export default RoleField
