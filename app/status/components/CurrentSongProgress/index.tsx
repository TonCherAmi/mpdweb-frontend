import React from 'react'

import CurrentSongElapsed from '@app/status/components/CurrentSongElapsed'
import CurrentSongDuration from '@app/status/components/CurrentSongDuration'
import CurrentSongProgressRange from '@app/status/components/CurrentSongProgressRange'

import styles from './styles.scss'

const CurrentSongProgress = () => {
  return (
    <div className={styles.container}>
      <CurrentSongElapsed className={styles.duration} />
      <CurrentSongProgressRange />
      <CurrentSongDuration className={styles.duration} />
    </div>
  )
}

export default CurrentSongProgress
