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
import { Provider } from 'next-auth/providers'
import { Register } from '@/components/Register'
import styles from '@/styles/Signin.module.scss'
interface FormValues {
  login_email: string
  login_password: string
}

const initialValues: FormValues = {
  login_email: '',
  login_password: '',
}
interface Props {
  providers: any
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
const loginValidation = Yup.object({
  login_email: Yup.string()
    .required('Email address is required')
    .email('Please enter a valid email address'),
  login_password: Yup.string().required('Please enter a password'),
})
export default function SigninPage({ providers }: Props) {
  let country = {
    name: 'Argentina',
    flag: 'https://cdn.ipregistry.co/flags/emojitwo/ar.svg',
  }
  const [user, setUser] = useState<FormValues>(initialValues)
  const { login_email, login_password } = user

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  return (
    <Layout title="Login" country={country}>
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign In</h1>
            <p>Get access to one of the best eshopping services in the world</p>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={loginValidation}
              onSubmit={(values) => {
                // Aquí puedes manejar la lógica de envío de formulario
                console.log(values)
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="login_email"
                    id="login_email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    id="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <CircledIconBtn
                    type="submit"
                    icon={<BiRightArrowAlt />}
                    text={'Sign In'}
                  />
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Forgot password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider: any) => {
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img
                          src={`../../../icons/${provider.name.toLowerCase()}.png`}
                          alt=""
                        />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
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
