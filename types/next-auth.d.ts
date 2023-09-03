// /types/next-auth.d.ts

import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    role: string
  }

  interface Session extends DefaultSession {
    user?: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    name: string
    role: string
  }
}
