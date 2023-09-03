import React from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'
export interface AdProps {}

const Ad: React.FC<AdProps> = () => {
  return (
    <Link href="/browse">
      <div className={styles.ad}></div>
    </Link>
  )
}

export default Ad
