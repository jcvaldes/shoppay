import React from 'react'
import { DotLoader } from 'react-spinners'
import styles from './DotLoader.module.scss'
export interface DotLoaderProps {
  loading: boolean
}

const DotLoaderSpinner: React.FC<DotLoaderProps> = ({
  loading,
}: DotLoaderProps) => {
  return (
    <div className={styles.loader}>
      <DotLoader color="#2f82ff" loading={loading} />
    </div>
  )
}

export default DotLoaderSpinner
