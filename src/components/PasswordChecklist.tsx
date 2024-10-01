import PasswordRequirement from './passwordRequirement'
type TProps = {
  validations: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    number: boolean
    special: boolean
  }
}

const PasswordChecklist = ({ validations }: TProps) => (
  <div className='space-y-2'>
    <p className='text-xs text-gray-500 font-medium'>Password must contain:</p>
    <ul className='pl-1 text-xs space-y-1'>
      <PasswordRequirement
        label='At least 8 characters'
        isValid={validations.length}
      />
      <PasswordRequirement
        label='At least one uppercase letter'
        isValid={validations.uppercase}
      />
      <PasswordRequirement
        label='At least one lowercase letter'
        isValid={validations.lowercase}
      />
      <PasswordRequirement
        label='At least one number'
        isValid={validations.number}
      />
      <PasswordRequirement
        label='At least one special character'
        isValid={validations.special}
      />
    </ul>
  </div>
)

export default PasswordChecklist
