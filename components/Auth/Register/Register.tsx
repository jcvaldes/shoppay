import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { LoginInput } from '@/components/Inputs/LoginInput'
import { CircledIconBtn } from '@/components/Buttons/CircledIconBtn'
import { BiRightArrowAlt } from 'react-icons/bi'
import * as Yup from 'yup'
import styles from '@/styles/Signin.module.scss'

export interface RegisterProps {}

interface FormValues {
  full_name: string
  email: string
  password: string
  conf_password: string
}

const initialValues: FormValues = {
  full_name: '',
  email: '',
  password: '',
  conf_password: '',
}
const registerValidation = Yup.object({
  full_name: Yup.string()
    .required('Full Name is required')
    .min(2, 'First name must be between 2 and 16 characters')
    .max(16, 'First name must be between 2 and 16 characters')
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
  const [user, setUser] = useState<FormValues>(initialValues)
  const { full_name, email, password, conf_password } = user

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  return (
    <div className={styles.login__container}>
      <div className={styles.login__form}>
        <h1>Sign Up</h1>
        <p>Get access to one of the best eshopping services in the world</p>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={registerValidation}
          onSubmit={(values) => {
            // Aquí puedes manejar la lógica de envío de formulario
            console.log(values)
          }}
        >
          {(form) => (
            <Form>
              <LoginInput
                type="text"
                name="full_name"
                id="full_name"
                icon="user"
                placeholder="Full Name"
                onChange={handleChange}
                autoComplete="off"
              />
              <LoginInput
                type="text"
                name="email"
                id="email"
                icon="email"
                placeholder="Email Address"
                onChange={handleChange}
                autoComplete="off"
              />
              <LoginInput
                type="password"
                name="password"
                id="password"
                icon="password"
                placeholder="Password"
                onChange={handleChange}
                autoComplete="off"
              />
              <LoginInput
                type="password"
                name="password"
                id="password"
                icon="password"
                placeholder="Re-Type Password"
                onChange={handleChange}
                autoComplete="off"
              />

              <CircledIconBtn
                type="submit"
                icon={<BiRightArrowAlt />}
                text={'Sign Up'}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Register
