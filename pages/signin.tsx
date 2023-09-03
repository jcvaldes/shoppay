import { Layout } from '@/components/Layout'
import { BiLeftArrowAlt } from 'react-icons/bi'
import styles from '@/styles/Signin.module.scss'
import Link from 'next/link'
import { Form, Formik } from 'formik'
import { LoginInput } from '@/components/Inputs/LoginInput'
import { FormEventHandler, useState } from 'react'

interface LoginInput {
  login_email: string
  login_password: string
}

const initialValues: LoginInput = {
  login_email: '',
  login_password: '',
}

export default function SigninPage() {
  let country = {
    name: 'Argentina',
    flag: 'https://cdn.ipregistry.co/flags/emojitwo/ar.svg',
  }
  const [user, setUser] = useState<LoginInput>(initialValues)
  const { login_email, login_password } = user

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  console.log({ user })
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
              initialValues={initialValues}
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
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <LoginInput
                    type="text"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <button type="submit">Enviar</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  )
}
