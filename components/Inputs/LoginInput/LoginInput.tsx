import React, { HTMLProps } from 'react'
import { BiUser } from 'react-icons/bi'
import { SiMinutemailer } from 'react-icons/si'
import { IoKeyOutline } from 'react-icons/io5'
import styles from './LoginInput.module.scss'
import { useField } from 'formik'

export interface LoginProps extends HTMLProps<HTMLInputElement> {
  name: string
  icon: 'user' | 'email' | 'password'
  placeholder: string
  type: string
}

const LoginInput: React.FC<LoginProps> = ({
  icon,
  placeholder,
  type,
  ...props
}: LoginProps) => {
  // debugger
  // const [field, meta] = useField({ ...props, type })
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
      <input type={type} placeholder={placeholder} autoComplete="off" />
    </div>
  )
}

export default LoginInput
