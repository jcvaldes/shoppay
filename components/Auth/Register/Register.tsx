import React, { useState } from 'react'
import { Form, Formik, FormikErrors } from 'formik'
import { LoginInput } from '@/components/Inputs/LoginInput'
import { CircledIconBtn } from '@/components/Buttons/CircledIconBtn'
import { BiRightArrowAlt } from 'react-icons/bi'
import axios from 'axios'

import * as Yup from 'yup'
import styles from '@/styles/Signin.module.scss'
import DotLoaderSpinner from '@/components/Loaders/DotLoader/DotLoader'
import Router from 'next/router'

export interface RegisterProps {}

interface FormValues {
  name: string
  email: string
  password: string
  conf_password: string
  success: string
  error: string
}

const initialValues: FormValues = {
  name: '',
  email: '',
  password: '',
  conf_password: '',
  success: '',
  error: '',
}
const registerValidation = Yup.object({
  name: Yup.string()
    .required('Full Name is required')
    .min(2, 'First name must be between 2 and 16 characters')
    .max(25, 'First name must be between 2 and 25 characters')
    .matches(/^[aA-zZ]/, 'Numbers and special characters are not allowed'),

  email: Yup.string()
    .required(
      "You'll need this when you llog in and if you ever need to reset your password",
    )
    .email('Please enter a valid email address'),
  password: Yup.string()
    .required(
      'Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &).',
    )
    .min(6, 'Password must be at least 6 characters')
    .max(36, 'Password must be at least 36 characters'),
  conf_password: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
})
const Register: React.FC<RegisterProps> = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<FormValues>(initialValues)
  const signUpHandler = async (values: FormValues) => {
    const { name, email, password, conf_password, error, success } = values
    try {
      setLoading(true)
      const { data } = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      })
      setUser({ ...values, error: '', success: data.message })
      setLoading(false)
      Router.push('/')
    } catch (error: any) {
      setLoading(false)
      setUser({ ...values, success: '', error: error.response.data.message })
    }
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined,
    ) => Promise<void | FormikErrors<FormValues>>,
  ) => {
    const { name, value } = e.target
    // setUser({ ...user, [name]: value })
    setFieldValue(name, value)
  }
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}

      <div className={styles.login__container}>
        <div className={styles.login__form}>
          <h1>Sign Up</h1>
          <p>Get access to one of the best eshopping services in the world</p>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={registerValidation}
            onSubmit={(values) => {
              signUpHandler(values)
              // Aquí puedes manejar la lógica de envío de formulario
              console.log(values)
            }}
          >
            {(form) => {
              return (
                <>
                  <Form>
                    <LoginInput
                      type="text"
                      label="name"
                      name="name"
                      id="name"
                      icon="user"
                      placeholder="Full Name"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, form.setFieldValue)
                      }
                    />
                    <LoginInput
                      type="text"
                      label="email"
                      name="email"
                      id="email"
                      icon="email"
                      placeholder="Email Address"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, form.setFieldValue)
                      }
                    />
                    <LoginInput
                      type="password"
                      label="password"
                      name="password"
                      id="password"
                      icon="password"
                      placeholder="Password"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, form.setFieldValue)
                      }
                    />
                    <LoginInput
                      type="password"
                      label="conf_password"
                      name="conf_password"
                      id="conf_password"
                      icon="password"
                      placeholder="Re-Type Password"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, form.setFieldValue)
                      }
                    />
                    <CircledIconBtn
                      type="submit"
                      icon={<BiRightArrowAlt />}
                      text={'Sign Up'}
                    />
                  </Form>
                </>
              )
            }}
          </Formik>
          <div>
            {user.success && (
              <span className={styles.success}>{user.success}</span>
            )}
          </div>
          <div>
            {user.error && <span className={styles.error}>{user.error}</span>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
