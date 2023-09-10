/* eslint-disable @next/next/no-img-element */
import { generateUUID } from '@/utils/generateUUID'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import styles from './Footer.module.scss'

export default function Links() {
  return (
    <div className={styles.footer__links}>
      {links.map((item, i) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <ul key={generateUUID()}>
            {i === 0 ? (
              <img src="../../../logo.png" alt="logo" />
            ) : (
              <b>{item.heading}</b>
            )}

            {item.links.map((link) => {
              return (
                <li key={generateUUID()}>
                  <Link href={link.link}>{link.name}</Link>
                </li>
              )
            })}
          </ul>
        )
      })}
    </div>
  )
}
const links = [
  {
    heading: 'SHOPPAY',
    links: [
      {
        id: 1,
        name: 'About us',
        link: '',
      },
      {
        id: 2,
        name: 'Contact us',
        link: '',
      },
      {
        id: 3,
        name: 'Social Responsibility',
        link: '',
      },
    ],
  },
  {
    heading: 'HELP & SUPPORT',
    links: [
      {
        id: 5,
        name: 'Shipping Info',
        link: '',
      },
      {
        id: 6,
        name: 'Returns',
        link: '',
      },
      {
        id: 7,
        name: 'How To Order',
        link: '',
      },
      {
        id: 8,
        name: 'How To Track',
        link: '',
      },
      {
        id: 9,
        name: 'Size Guide',
        link: '',
      },
    ],
  },
  {
    heading: 'Customer service',
    links: [
      {
        id: 10,
        name: 'Customer service',
        link: '',
      },
      {
        id: 11,
        name: 'Terms and Conditions',
        link: '',
      },
      {
        id: 12,
        name: 'Consumers (Transactions)',
        link: '',
      },
      {
        id: 13,
        name: 'Take our feedback survey',
        link: '',
      },
    ],
  },
]
