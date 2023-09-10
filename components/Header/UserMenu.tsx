/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'
import { signIn, signOut } from 'next-auth/react'
import { Session } from 'next-auth'

export interface UserMenuProps {
  session: Session | null
}

const UserMenu: React.FC<UserMenuProps> = ({ session }: UserMenuProps) => {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Shoppay !</h4>
      {session ? (
        <div className={styles.flex}>
          {/* <img
            src="https://www.pngarts.com/files/3/Avatar-PNG-Picture.png"
            alt="avatar"
            className={styles.menu__img}
          /> */}
          <img
            src={session.user?.image!}
            alt="avatar"
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>{session.user?.name}</h3>
            <span onClick={() => signOut()}>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button className={styles.btn_outlined} onClick={() => signIn()}>
            Login
          </button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
          <Link href="/profile/address">Address</Link>
        </li>
        <li>
          <Link href="/profile/whishlist">Whishlist</Link>
        </li>
      </ul>
    </div>
  )
}

export default UserMenu
