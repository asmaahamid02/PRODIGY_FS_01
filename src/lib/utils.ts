import toast from 'react-hot-toast'

export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const validatePassword = (password: string) => ({
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /[0-9]/.test(password),
  special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
})

export const isValidPassword = (password: string) =>
  Object.values(validatePassword(password)).every(Boolean)

export const isValidName = (name: string) => name.length >= 5

export const isValidEmail = (email: string) => validateEmail(email)

export const handleError = (error: unknown) => {
  let message = 'An error occurred'
  if (error instanceof Error) {
    message = error.message
  } else if (typeof error === 'string') {
    message = error
  }

  toast.error(message)
  console.error(error)
}
