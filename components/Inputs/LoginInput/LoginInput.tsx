import React, { HTMLProps } from 'react'
import { BiUser } from 'react-icons/bi'
import { SiMinutemailer } from 'react-icons/si'
import { IoKeyOutline } from 'react-icons/io5'
import styles from './LoginInput.module.scss'

export interface LoginProps extends HTMLProps<HTMLInputElement> {
  icon: string
  placeholder: string
}

const LoginInput: React.FC<LoginProps> = ({
  icon,
  placeholder,
  ...props
}: LoginProps) => {
  return (
    <div className={styles.input}>
      {icon == 'user' ? (
        <BiUser />
      ) : icon == 'email' ? (
        <SiMinutemailer />
      ) : icon == 'password' ? (
        <IoKeyOutline />
      ) : (
        ''
      )}
      <input type="text" placeholder={placeholder} {...props} />
    </div>
  )
}

export default LoginInput
