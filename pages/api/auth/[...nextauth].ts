import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import TwitterProvider from 'next-auth/providers/twitter'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import Auth0Provider from 'next-auth/providers/auth0'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/config/mongodb'
import { Adapter } from 'next-auth/adapters'
import User from '@/models/User'
import db from '@/utils/db'
// type User = {
//   id: string
//   name: string
//   email: string
//   role: string // Add the role property here
// }

interface Credentials {
  email?: string
  password?: string
}

interface AuthorizeParams {
  credentials: Credentials
  req: {
    /* Define el tipo específico de req aquí */
  }
}
db.connectDb()
export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const email = credentials?.email
        const password = credentials?.password
        console.log('signinuser')
        // Any object returned will be saved in `user` property of the JWT
        return SignInUser({ password, email }) // Cast to the User type
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID!,
    //   clientSecret: process.env.TWITTER_SECRET!,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID!,
    //   clientSecret: process.env.FACEBOOK_SECRET!,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID!,
    //   clientSecret: process.env.GOOGLE_SECRET!,
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_CLIENT_ID!,
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    //   issuer: process.env.AUTH0_ISSUER!,
    // }),
  ],
}
export default NextAuth({
  session: {
    strategy: 'jwt',
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    maxAge: 3600,
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  ...authOptions,
  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub)
      session.user!.id = token.sub || user._id.toString()
      session.user!.role = token.role || 'user'
      return session
    },
  },
  pages: {
    signIn: '/signin',
  },

  debug: false,
})

const SignInUser = async ({ password, email }: Credentials) => {
  // Check if email and password is entered

  if (!email || !password) {
    throw new Error('Please enter email or password')
  }
  // Find user in the database
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    console.log('This email does not exist')
    throw new Error('This email does not exist')
  }
  // Check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    throw new Error('Invalid Email or Password')
  }
  // await db.disconnectDb()
  return user
}
