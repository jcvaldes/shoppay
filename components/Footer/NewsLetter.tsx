import Link from 'next/link'
import React from 'react'
import {
  BsInstagram,
  BsPinterest,
  BsSnapchat,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs'
import { FaFacebookF, FaTiktok } from 'react-icons/fa'
import styles from './Footer.module.scss'

export interface NewsLetterProps {}

const NewsLetter: React.FC<NewsLetterProps> = () => {
  return (
    <div className={styles.footer__newsletter}>
      <h3>SIGN UP FOR OUR NEWSLETTER</h3>
      <div className={styles.footer__flex}>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Your Email Address"
        />
        <button className={styles.btn_primary}>SUBSCRIBE</button>
      </div>
      <p>
        By clicking the SUBSCRIBE button, you are agreeing to{' '}
        <Link href="">our Privacy & Cookie Policy</Link>
      </p>
    </div>
  )
}

export default NewsLetter
