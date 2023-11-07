import { Inter } from 'next/font/google'
import axios from 'axios'
import { Country } from '@/models/country.model'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import { Layout } from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })
interface Props {
  country: Country
}

export default function Home({ country }: Props) {
  const { data: session } = useSession()
  debugger
  return (
    <div>
      {/* <Header country={country} /> */}
      <Layout title="Home" country={country}>
        {session ? 'you are logged in' : 'not logged in'}
      </Layout>
      {/* <Footer country={country} /> */}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  country: Country
}> = async () => {
  let country = {
    name: 'Argentina',
    flag: 'https://cdn.ipregistry.co/flags/emojitwo/ar.svg',
  }
  if (process.env.NODE_ENV !== 'development') {
    let data = await axios
      .get('https://api.ipregistry.co/181.29.155.56?key=chy0au8st0zuqkg7')
      .then((res) => {
        return res.data.location.country
      })
      .catch((err) => {
        console.log(err)
      })

    country = {
      name: data.name,
      flag: data.flag.emojitwo,
    } as Country
  }

  return {
    props: {
      country,
    },
  }
}
