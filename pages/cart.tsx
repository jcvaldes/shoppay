import { Layout } from '@/components/Layout'
import React from 'react'

const CartPage = () => {
  let country = {
    name: 'Argentina',
    flag: 'https://cdn.ipregistry.co/flags/emojitwo/ar.svg',
  }
  return (
    <Layout title="Login" country={country}>
      <h1>Cart</h1>
    </Layout>
  )
}

export default CartPage
