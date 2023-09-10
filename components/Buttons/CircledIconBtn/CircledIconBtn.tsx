import React from 'react'
import { IconBaseProps, IconType } from 'react-icons'
import { BiRightArrowAlt } from 'react-icons/bi'
import styles from './CircledIconBtn.module.scss'

export interface CircledIconBtnProps {
  icon: JSX.Element
  type: 'button' | 'submit' | 'reset'
  text: string
}

const CircledIconBtn: React.FC<CircledIconBtnProps> = ({
  type,
  text,
  icon,
}) => {
  return (
    <button className={styles.button} type={type}>
      {text}
      <div className={styles.svg__wrap}>{icon}</div>
    </button>
  )
}

export default CircledIconBtn
