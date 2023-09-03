import React from 'react'
import Ad from './Ad'
import Top from './Top'
import Main from './Main'
import styles from './Header.module.scss'
import { Country } from '@/models/country.model'

export interface HeaderProps {
  country: Country
}

const Header: React.FC<HeaderProps> = ({ country }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Ad />
      <Top country={country} />
      <Main />
    </header>
  )
}

export default Header
