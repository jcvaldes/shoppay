/* eslint-disable @next/next/no-img-element */
import { Layout } from '@/components/Layout'

import styles from '@/styles/Forgot.module.scss'
import { Forgot } from '@/components/Auth/Forgot'
interface Props {
  csrfToken: string
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

export default function ForgotPage({ csrfToken }: Props) {
  console.log({ csrfToken })
  let country = {
    name: 'Argentina',
    flag: 'https://cdn.ipregistry.co/flags/emojitwo/ar.svg',
  }

  return (
    <Layout title="Forgot" country={country}>
      <div className={styles.login}>
        <Forgot />
      </div>
    </Layout>
  )
}
