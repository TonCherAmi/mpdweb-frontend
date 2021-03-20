import React from 'react'

import { observer } from 'mobx-react'

import styles from './styles.scss'

const CurrentSong: React.FC = () => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>
      -------
      </span>
      <span className={styles.artist}>
      ---
      </span>
    </div>
  )
}

export default observer(CurrentSong)
