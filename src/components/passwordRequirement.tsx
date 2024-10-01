import Check from './icons/Check'
import Close from './icons/Close'

const PasswordRequirement = ({
  label,
  isValid,
}: {
  label: string
  isValid: boolean
}) => (
  <li className='flex items-center gap-1'>
    {isValid ? <Check /> : <Close />}
    <span className={isValid ? 'text-green-500' : 'text-red-500'}>{label}</span>
  </li>
)

export default PasswordRequirement
