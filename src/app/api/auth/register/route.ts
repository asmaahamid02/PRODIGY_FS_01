import { isValidEmail, isValidName, isValidPassword } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import client from '@/lib/db'

type TRegisterRequest = {
  name: string
  password: string
  confirmPassword: string
  email: string
  role: string
}
export async function POST(req: NextRequest) {
  try {
    const body: TRegisterRequest = await req.json()
    const { name, password, confirmPassword, email, role } = body

    //validation
    if (!isValidName(name)) {
      return NextResponse.json(
        { error: 'Name must be at least 5 characters long' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Email is not valid' }, { status: 400 })
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          error:
            'Password must be at least 8 characters long and contain at least one uppercase, one lowercase, one number and one special character',
        },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    if (!['admin', 'instructor', 'student'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    const duplicate = await client
      .db(process.env.DB_NAME)
      .collection('users')
      .findOne({ email })

    if (duplicate) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await client
      .db(process.env.DB_NAME)
      .collection('users')
      .insertOne({
        name,
        email,
        password: hashedPassword,
        role,
      })

    if (!user) {
      return NextResponse.json(
        { error: 'User registration failed' },
        { status: 500 }
      )
    }

    const newUser = await client
      .db(process.env.DB_NAME)
      .collection('users')
      .findOne({ email })

    return NextResponse.json(
      { message: 'User registered successfully', user: newUser },
      { status: 201 }
    )
    //eslint-disable-next-line
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
