import bcrypt from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import client from '@/lib/db'
import jwt from 'jsonwebtoken'
import { MongoDBAdapter } from '@auth/mongodb-adapter'

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
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Invalid credentials')
        }

        const user = await client
          .db(process.env.DB_NAME)
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

        const { _id, email, role, name } = user

        return {
          id: _id.toString(),
          email,
          role,
          name,
          token,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user
        token.user.token = user.token || account?.access_token || ''
      }
      return Promise.resolve(token)
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user
      }

      return Promise.resolve(session)
    },
  },
  //@ts-expect-error Type check error
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
