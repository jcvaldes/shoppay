import React, { useState } from 'react'
import styles from './styles/Forgot.module.scss'
import { Layout } from '@/components/Layout'
import Link from 'next/link'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import { Form, Formik, FormikErrors, FormikValues } from 'formik'
import { CircledIconBtn } from '@/components/Buttons/CircledIconBtn'
import { LoginInput } from '@/components/Inputs/LoginInput'
import * as Yup from 'yup'
import axios from 'axios'
import DotLoaderSpinner from '@/components/Loaders/DotLoader/DotLoader'

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
const ForgotPage = () => {
  // const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const forgotHandler = async (values: any) => {
    const { email, error, success } = values
    try {
      setLoading(true)
      const { data } = await axios.post('/api/auth/forgot', {
        email,
      })
      // setUser({ ...values, error: '', success: data.message })
      setError('')
      setSuccess(data.message)
      setLoading(false)
      // Router.push('/')
    } catch (error: any) {
      setLoading(false)
      setSuccess('')
      setError(error.response.data.message)
      // setUser({ ...values, success: '', error: error.response.data.message })
    }
  }

  let country = {
    name: 'Argentina',
    flag: 'https://cdn.ipregistry.co/flags/emojitwo/ar.svg',
  }

  return (
    <Layout title="Forgot" country={country}>
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className={styles.forgot}>
        <div>
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
                    // onChange={(e: {
                    //   target: { value: React.SetStateAction<string> }
                    // }) => setEmail(e.target.value)}
                    autoComplete="off"
                  />
                  <CircledIconBtn
                    type="submit"
                    icon={<BiRightArrowAlt />}
                    text={'Send link'}
                  />
                  <div style={{ marginTop: '10px' }}>
                    {error && <span className={styles.error}>{error}</span>}
                    {success && (
                      <span className={styles.success}>{success}</span>
                    )}
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  )
}

export default ForgotPage
