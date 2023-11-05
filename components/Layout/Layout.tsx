import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { Country } from '@/models/country.model'

export interface LayoutProps {
  title: string
  country?: Country
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  children,
  title,
  country,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header country={country!} />
      {/* <ToastContainer position="bottom-right" /> */}
      {children}
      <Footer country={country!} />
    </div>
  )
}

export default Layout
