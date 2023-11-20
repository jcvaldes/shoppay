import { Layout } from '@/components/Layout'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import absoluteUrl from 'next-absolute-url'

const emailVerified = () => {
  const url = `https://rickandmortyapi.com/api/location`

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.results)
}
const ActivatePage = ({ token }: { token: string }) => {
  let country = {
    name: 'Argentina',
    flag: 'https://cdn.ipregistry.co/flags/emojitwo/ar.svg',
  }

  return (
    <Layout title="Login" country={country}>
      <h1>Activate</h1>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { params } = context

  return {
    props: { token: params?.token },
  }
}

export default ActivatePage
