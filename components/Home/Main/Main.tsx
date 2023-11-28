import React from 'react'
import styles from './styles/Main.module.scss'
import MainSwiper from './Swiper/Swiper'
import { Offers } from './Offers'
export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <div className={styles.menu}>menu</div>
      <MainSwiper />
      <Offers />
      <div className={styles.user}>user</div>
    </div>
  )
}

export default Main
