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

interface Props {
  csrfToken: string
}

const initialValues: FormikValues = {
  email: '',
  success: '',
  error: '',
}
const forgotValidation = Yup.object({
  email: Yup.string()
    .required(
      "You'll need this when you log in and if you ever need to reset your password",
    )
    .email('Please enter a valid email address'),
})
const Forgot: React.FC<Props> = ({ csrfToken }: Props) => {
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

  const forgotHandler = async (values: any) => {
    const { email, error, success } = values

    try {
      setLoading(true)
      const { data } = await axios.post('/api/auth/forgot', {
        email,
      })
      setUser({ ...values, error: '', success: data.message })
      setLoading(false)
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
            Forgot your password <Link href="/">Login instead</Link>
          </span>
        </div>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={forgotValidation}
          onSubmit={(values) => {
            forgotHandler(values)
            // Aquí puedes manejar la lógica de envío de formulario
            // console.log(values)
          }}
        >
          {(form) => {
            return (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  label="email"
                  id="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, form.setFieldValue)
                  }
                  autoComplete="off"
                />
                <CircledIconBtn
                  type="submit"
                  icon={<BiRightArrowAlt />}
                  text={'Send link'}
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

export default Forgot
