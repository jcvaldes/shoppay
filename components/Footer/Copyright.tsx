import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.scss'
import { IoLocationSharp } from 'react-icons/io5'
import { Country } from '@/models/country.model'
import { debug } from 'console'

export interface CopyrightProps {
  country: Country
}

const Copyright: React.FC<CopyrightProps> = ({ country }: CopyrightProps) => {
  return (
    <div className={styles.footer__copyright}>
      <section>©2022 SHOPPAY All Rights Resereved.</section>
      <section>
        <ul>
          {data.map((link) => (
            <li key={link.name}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
          <li>
            <a>
              <IoLocationSharp /> {country.name}
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
const data = [
  {
    name: 'Privacy Center',
    link: '',
  },
  {
    name: 'Privacy & Cookie Policy',
    link: '',
  },
  {
    name: 'Manage Cookies',
    link: '',
  },
  {
    name: 'Terms & Conditions',
    link: '',
  },
  {
    name: 'Copyright Notice',
    link: '',
  },
]

export default Copyright
