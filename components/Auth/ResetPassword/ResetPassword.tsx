import { Form, Formik, FormikErrors, FormikValues } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import DotLoaderSpinner from '@/components/Loaders/DotLoader/DotLoader'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import Link from 'next/link'
import { LoginInput } from '@/components/Inputs/LoginInput'
import { CircledIconBtn } from '@/components/Buttons/CircledIconBtn'
import Router from 'next/router'
import styles from '@/styles/Forgot.module.scss'
import { signIn } from 'next-auth/react'

type Props = {
  userId: string
}
const initialValues: FormikValues = {
  password: '',
  conf_password: '',
  success: '',
  error: '',
}
const passwordValidation = Yup.object({
  password: Yup.string()
    .required('Please enter a new password.')
    .min(6, 'Password must be at least 6 characters')
    .max(36, 'Password must be at least 36 characters'),
  conf_password: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
})
const ResetPassword: React.FC<Props> = ({ userId }: Props) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<FormikValues>(initialValues)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined,
    ) => Promise<void | FormikErrors<FormikValues>>,
  ) => {
    const { name, value } = e.target
    // setUser({ ...user, [name]: value })
    setFieldValue(name, value)
  }

  const resetPasswordHandler = async (values: any) => {
    const { password } = values

    try {
      setLoading(true)

      const { data } = await axios.put('/api/auth/reset', {
        userId,
        password,
      })
      let options = {
        redirect: false,
        email: data.email,
        password,
      }
      await signIn('credentials', options)
      setUser({ ...values, error: '' })
      setLoading(false)
      // window.location.reload()
      Router.push('/')
    } catch (error: any) {
      setLoading(false)
      setUser({ ...values, success: '', error: error.response.data.message })
    }
  }
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className={styles.forgot__container}>
        <div className={styles.forgot__header}>
          <div className={styles.back__svg}>
            <BiLeftArrowAlt />
          </div>
          <span>
            Reset your password <Link href="/">Login instead</Link>
          </span>
        </div>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={passwordValidation}
          onSubmit={(values) => {
            resetPasswordHandler(values)
            // Aquí puedes manejar la lógica de envío de formulario
            // console.log(values)
          }}
        >
          {(form) => {
            return (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  label="password"
                  id="password"
                  icon="password"
                  placeholder="Password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, form.setFieldValue)
                  }
                  autoComplete="off"
                />
                <LoginInput
                  type="password"
                  name="conf_password"
                  label="Confirm Password"
                  id="conf_password"
                  icon="password"
                  placeholder="Confirm Password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, form.setFieldValue)
                  }
                  autoComplete="off"
                />
                <CircledIconBtn
                  type="submit"
                  icon={<BiRightArrowAlt />}
                  text={'Submit'}
                />
                <div style={{ marginTop: '10px' }}>
                  {user.error && (
                    <span className={styles.error}>{user.error}</span>
                  )}
                  {user.success && (
                    <span className={styles.success}>{user.success}</span>
                  )}
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </>
  )
}

export default ResetPassword
