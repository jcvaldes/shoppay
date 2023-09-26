/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { signIn } from 'next-auth/react'
import { OAuthProvider } from 'next-auth/providers'
import { LoginInput } from '@/components/Inputs/LoginInput'
import { CircledIconBtn } from '@/components/Buttons/CircledIconBtn'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import * as Yup from 'yup'
import Link from 'next/link'
import styles from '@/styles/Signin.module.scss'
export interface LoginProps {
  providers: OAuthProvider[]
}
interface FormValues {
  login_email: string
  login_password: string
}

const initialValues: FormValues = {
  login_email: '',
  login_password: '',
}
const loginValidation = Yup.object({
  login_email: Yup.string()
    .required('Email address is required')
    .email('Please enter a valid email address'),
  login_password: Yup.string().required('Please enter a password'),
})
const Login: React.FC<LoginProps> = ({ providers }: LoginProps) => {
  const [user, setUser] = useState<FormValues>(initialValues)
  const { login_email, login_password } = user
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  return (
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
  )
}

export default Login
