import { Layout } from '@/components/Layout'
import { BiLeftArrowAlt } from 'react-icons/bi'
import styles from '@/styles/Signin.module.scss'
import Link from 'next/link'

export default function SigninPage() {
  let country = {
    name: 'Argentina',
    flag: 'https://cdn.ipregistry.co/flags/emojitwo/ar.svg',
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
        </div>
      </div>
    </Layout>
  )
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req })
//   if (session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {},
//   }
// }
