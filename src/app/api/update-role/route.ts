import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { nextAuthOptions } from '../auth/[...nextauth]/options'
import client from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body: { role: string } = await req.json()
  const { role } = body
  const { email } = session.user

  if (!['admin', 'instructor', 'student'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  const foundUser = await client
    .db(process.env.DB_NAME)
    .collection('users')
    .findOneAndUpdate({ email }, { $set: { role } })

  if (!foundUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({
    message: `Joined as ${role.charAt(0).toUpperCase()}${role.slice(1)}`,
  })
}
