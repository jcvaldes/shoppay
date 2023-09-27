/* eslint-disable @next/next/no-img-element */
import { Layout } from '@/components/Layout'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'

import Link from 'next/link'
import { Form, Formik } from 'formik'
import { LoginInput } from '@/components/Inputs/LoginInput'
import { FormEventHandler, useState } from 'react'
import * as Yup from 'yup'
import { CircledIconBtn } from '@/components/Buttons/CircledIconBtn'
import { getProviders, getSession, signIn } from 'next-auth/react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Session } from 'next-auth'
import { OAuthProvider, Provider } from 'next-auth/providers'
import { Register } from '@/components/Auth/Register'
import styles from '@/styles/Signin.module.scss'
import { Login } from '@/components/Auth/Login'

interface Props {
  providers: OAuthProvider[]
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

export default function SigninPage({ providers }: Props) {
  let country = {
    name: 'Argentina',
    flag: 'https://cdn.ipregistry.co/flags/emojitwo/ar.svg',
  }

  return (
    <Layout title="Login" country={country}>
      <div className={styles.login}>
        <Login providers={providers} callbackUrl={'/'} />
        <Register />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  // const session = (await getSession(context)) as CustomSession
  const providers = await getProviders()
  // Convierte el objeto de proveedores en un array de objetos
  const providerArray = Object.keys(providers!).map((key) => ({
    ...providers![key],
    id: key,
  }))

  return {
    props: { providers: providerArray },
  }
}
