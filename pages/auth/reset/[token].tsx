/* eslint-disable @next/next/no-img-element */
import { Layout } from '@/components/Layout'

import styles from '@/styles/Forgot.module.scss'
import { ResetPassword } from '@/components/Auth/ResetPassword'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import jwt from 'jsonwebtoken'
import { getSession } from 'next-auth/react'
interface DecodedToken {
  id: string
  // Add other properties if present in the decoded token
}
interface Props {
  userId: string
}
// interface CustomSession extends Session {
//   user: {
//     id: string
//     name: string
//     email: string
//     role: string
//     // Define la estructura del usuario según tus necesidades
//   }
//   // Agrega cualquier otro campo personalizado que puedas necesitar
//   providers: { [key: string]: Provider[] }
// }

export default function ResetPage({ userId }: Props) {
  let country = {
    name: 'Argentina',
    flag: 'https://cdn.ipregistry.co/flags/emojitwo/ar.svg',
  }

  return (
    <Layout title="Reset" country={country}>
      <div className={styles.forgot}>
        <ResetPassword userId={userId} />
      </div>
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { query, req } = context
  // si esta logueado no  se presenta el componente de resetear contraseña
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: {
        destination: '/',
      },
    }
  }
  const token = query.token as string

  try {
    const { id: userId } = jwt.verify(
      token,
      process.env.RESET_TOKEN_SECRET!,
    ) as DecodedToken

    return {
      props: { userId },
    }
  } catch (error) {
    // Handle token verification error
    console.error('Token verification error:', error)

    return {
      redirect: {
        destination: '/signin', // Redirect to login page or any other page
        permanent: false,
      },
    }
  }
}
