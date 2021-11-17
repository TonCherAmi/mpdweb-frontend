import React from 'react'

import * as Icons from '@app/common/icons'

import styles from './styles.scss'

const Spinner = () => (
  <div className={styles.container}>
    <Icons.Spinner className={styles.icon} />
  </div>
)

export default Spinner
