import React, { useEffect, useRef } from 'react'
import Links from './Links'
import Socials from './Socials'
import NewsLetter from './NewsLetter'
import Payment from './Payment'
import Copyright from './Copyright'
import styles from './Footer.module.scss'
import { Country } from '@/models/country.model'

export interface FooterProps {
  country: Country
}

const Footer: React.FC<FooterProps> = ({ country }: FooterProps) => {
  const isMounted = useRef(false)
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    }
  }, [])
  return isMounted.current ? (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
        <Socials />
        <NewsLetter />
        <Payment />
        <Copyright country={country} />
      </div>
    </footer>
  ) : (
    <></>
  )
}

export default Footer
