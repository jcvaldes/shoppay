import React, { HTMLProps } from 'react'
import { BiUser } from 'react-icons/bi'
import { SiMinutemailer } from 'react-icons/si'
import { IoKeyOutline } from 'react-icons/io5'
import styles from './LoginInput.module.scss'
import {
  ErrorMessage,
  FieldAttributes,
  FieldInputProps,
  useField,
} from 'formik'

type InputProps = { type: string } & FieldAttributes<{}>
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
  const [field, meta] = useField(props.name)

  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error ? styles.error : ''
      }`}
    >
      {icon === 'user' ? (
        <BiUser />
      ) : icon === 'email' ? (
        <SiMinutemailer />
      ) : icon === 'password' ? (
        <IoKeyOutline />
      ) : (
        ''
      )}
      <input type={type} placeholder={placeholder} {...field} />
      {meta.touched && meta.error && (
        <div className={styles.error__popup}>
          <span></span>
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  )
}

export default LoginInput
