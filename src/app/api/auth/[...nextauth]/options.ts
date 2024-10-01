import bcrypt from 'bcryptjs'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import client from '@/lib/db'
import jwt from 'jsonwebtoken'

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Credentials: ', credentials)
        if (!credentials) {
          throw new Error('Invalid credentials')
        }

        const user = await client
          .db('secureme_db')
          .collection('users')
          .findOne({ email: credentials?.email })

        if (!user) {
          throw new Error('Invalid credentials')
        }

        const validPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!validPassword) {
          throw new Error('Invalid credentials')
        }

        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.NEXTAUTH_SECRET as string,
          {
            expiresIn: '1d',
          }
        )

        return { email: user.email, role: user.role, name: user.name, token }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) token.role = (user as any).role || (account as any).role
      return token
    },
    async session({ session, token }) {
      if (session.user && token.role) session.user.role = token.role
      return session
    },
    async signIn(params) {
      console.log('params: ', params)
      return true
    },
  },
  adapter: MongoDBAdapter(client),
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
}
