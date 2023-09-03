/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { FaOpencart } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import styles from './Header.module.scss'

export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const { cart } = useSelector((state) => ({ ...state }))
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link legacyBehavior href="/">
          <a href="" className={styles.logo}>
            <img src="../../../logo.png" alt="logo" />
          </a>
        </Link>
        <div className={styles.search}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
          <div className={styles.search__icon}>
            <RiSearch2Line />
          </div>
        </div>
        <Link legacyBehavior href="/cart">
          <a className={styles.cart}>
            <FaOpencart />
            <span>{cart.length}</span>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Main
