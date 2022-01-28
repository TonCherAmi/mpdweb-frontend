import React from 'react'

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

export default CurrentSong
