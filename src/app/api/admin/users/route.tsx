import { NextResponse } from 'next/server'
import client from '@/lib/db'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../../auth/[...nextauth]/options'

export async function GET() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
  }

  if (session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const users = await client
    .db(process.env.DB_NAME)
    .collection('users')
    .find({
      role: { $ne: 'admin' },
      email: { $ne: session.user.email },
    })
    .sort({ role: -1 })
    .toArray()

  return NextResponse.json({ users }, { status: 200 })
}
