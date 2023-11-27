import React from 'react'
import styles from './styles/Main.module.scss'
export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <div className={styles.menu}>menu</div>
      <div className={styles.swiper}>swiper</div>
      <div className={styles.offers}>offers</div>
      <div className={styles.user}>user</div>
    </div>
  )
}

export default Main
