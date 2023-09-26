import React, { HTMLProps } from 'react'
import { BiUser } from 'react-icons/bi'
import { SiMinutemailer } from 'react-icons/si'
import { IoKeyOutline } from 'react-icons/io5'
import styles from './LoginInput.module.scss'
import {
  ErrorMessage,
  FieldAttributes,
  FieldHookConfig,
  FieldInputProps,
  useField,
} from 'formik'

// type InputProps = { type: string } & FieldAttributes<{}>
export interface LoginProps extends HTMLProps<HTMLInputElement> {
  name: string
  icon: 'user' | 'email' | 'password'
  placeholder: string
  type: string
}
interface Props {
  label: string
  icon: 'user' | 'email' | 'password'
  name: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  [x: string]: any
}
type InputProps = {
  label: string
  icon: 'user' | 'email' | 'password'
  placeholder: string
  id: string
  name: string
  validate?: (value: any) => undefined | string | Promise<any>
  type?: string
  multiple?: boolean
  value?: string
  onChange?: (value: any) => void
}

const LoginInput: React.FC<Props> = ({ label, icon, ...props }: Props) => {
  const [field, meta] = useField(props)

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
      <input {...props} {...field} />
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
