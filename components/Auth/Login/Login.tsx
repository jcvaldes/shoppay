/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Form, Formik, FormikErrors } from 'formik'
import { signIn } from 'next-auth/react'
import { OAuthProvider } from 'next-auth/providers'
import { LoginInput } from '@/components/Inputs/LoginInput'
import { CircledIconBtn } from '@/components/Buttons/CircledIconBtn'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import * as Yup from 'yup'
import Link from 'next/link'
import Router from 'next/router'
import styles from '@/styles/Signin.module.scss'
import DotLoaderSpinner from '@/components/Loaders/DotLoader/DotLoader'
export interface LoginProps {
  providers: OAuthProvider[]
  callbackUrl: string
  csrfToken: string
}
interface FormValues {
  login_email: string
  login_password: string
  success: string
  error: string
}

const initialValues: FormValues = {
  login_email: '',
  login_password: '',
  success: '',
  error: '',
}
const loginValidation = Yup.object({
  login_email: Yup.string()
    .required('Email address is required')
    .email('Please enter a valid email address'),
  login_password: Yup.string().required('Please enter a password'),
})
const Login: React.FC<LoginProps> = ({
  providers,
  callbackUrl,
  csrfToken,
}: LoginProps) => {
  const [user, setUser] = useState<FormValues>(initialValues)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined,
    ) => Promise<void | FormikErrors<FormValues>>,
  ) => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  const signInHandler = async (values: FormValues) => {
    const { login_email, login_password } = values
    try {
      setLoading(true)
      let options = {
        redirect: false,
        email: login_email,
        password: login_password,
      }
      const res = await signIn('credentials', options)
      setUser({ ...values, error: '' })
      setLoading(false)
      if (res?.error) {
        setLoading(false)
        setUser({ ...values, error: res?.error })
      } else {
        return Router.push(callbackUrl || '/')
      }
    } catch (error: any) {
      setLoading(false)
      setUser({ ...values, error: error.response.data.message })
    }
  }
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
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
              signInHandler(values)
              // Aquí puedes manejar la lógica de envío de formulario
              // console.log(values)
            }}
          >
            {(form) => {
              return (
                <>
                  <Form method="post" action="/api/auth/signin/email">
                    <input
                      type="hidden"
                      name="csrfToken"
                      defaultValue={csrfToken}
                    />
                    <LoginInput
                      type="text"
                      name="login_email"
                      label="login_email"
                      id="login_email"
                      icon="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <LoginInput
                      type="password"
                      name="login_password"
                      label="login_password"
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
                    {user.error && (
                      <span className={styles.error}>{user.error}</span>
                    )}
                    <div className={styles.forgot}>
                      <Link href="/auth/forgot">Forgot password ?</Link>
                    </div>
                  </Form>
                </>
              )
            }}
          </Formik>
          <div className={styles.login__socials}>
            <span className={styles.or}>Or continue with</span>
            <div className={styles.login__socials_wrap}>
              {providers.map((provider: any) => {
                if (provider.name === 'Credentials') {
                  return
                }
                return (
                  <div key={provider.name}>
                    <button
                      className={styles.social__btn}
                      onClick={(e) => {
                        e.preventDefault()
                        console.log(process.env.NEXTAUTH_URL)
                        signIn(provider.id, {
                          callbackUrl: `${process.env.NEXTAUTH_URL}`,
                        })
                      }}
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
    </>
  )
}

export default Login
