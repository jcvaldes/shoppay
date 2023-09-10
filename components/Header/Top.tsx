/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import Link from 'next/link'
import { MdSecurity } from 'react-icons/md'
import { BsSuitHeart } from 'react-icons/bs'
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri'
import UserMenu from './UserMenu'
import styles from './Header.module.scss'
import { Country } from '@/models/country.model'
import { useSession } from 'next-auth/react'

export interface TopProps {
  country: Country
}

const Top: React.FC<TopProps> = ({ country }: TopProps) => {
  // const [loggedIn, setLoggedIn] = useState(true)
  const { data: session } = useSession()

  const [visible, setVisible] = useState(false)

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img src={country.flag} alt={country.name} />
            <span>{country.name} / usd</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/whishlist">
              <span>Whishlist</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {session ? (
              <div className={styles.flex}>
                {/* <img
                    src="https://www.pngarts.com/files/3/Avatar-PNG-Picture.png"
                    alt="avatar"
                  /> */}
                <img src={session.user?.image!} alt="avatar" />
                <span>{session.user!.name}</span>
                <RiArrowDropDownFill />
              </div>
            ) : (
              <div className={styles.flex}>
                <RiAccountPinCircleLine />
                <span>Account</span>
                <RiArrowDropDownFill />
              </div>
            )}
            {visible && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Top
