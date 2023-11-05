/* eslint-disable @next/next/no-img-element */
import { Layout } from '@/components/Layout'

import { getCsrfToken, getProviders, getSession } from 'next-auth/react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { OAuthProvider } from 'next-auth/providers'
import { Register } from '@/components/Auth/Register'
import styles from '@/styles/Signin.module.scss'
import { Login } from '@/components/Auth/Login'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
interface Props {
  providers: OAuthProvider[]
  callbackUrl: string
  csrfToken: string
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

export default function SigninPage({
  providers,
  callbackUrl,
  csrfToken,
}: Props) {
  console.log({ providers, callbackUrl, csrfToken })
  let country = {
    name: 'Argentina',
    flag: 'https://cdn.ipregistry.co/flags/emojitwo/ar.svg',
  }

  return (
    <Layout title="Login" country={country}>
      <div className={styles.login}>
        <Login
          providers={providers}
          callbackUrl={callbackUrl}
          csrfToken={csrfToken}
        />
        <Register />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  // const session = (await getSession(context)) as CustomSession
  const { req, res, query } = context
  console.log('session')
  const session = await getServerSession(req, res, authOptions)
  debugger
  console.log(session)
  const { callbackUrl } = query
  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    } as any
  }

  const csrfToken = await getCsrfToken(context)
  console.log(csrfToken)
  const providers = await getProviders()
  // Convierte el objeto de proveedores en un array de objetos
  const providerList = Object.keys(providers!).map((key) => ({
    ...providers![key],
    id: key,
  }))

  return {
    props: { providers: providerList, csrfToken, callbackUrl },
  }
}
