import React from 'react'

import useCurrentSong from '@app/status/use/useCurrentSong'

import styles from './styles.scss'

const CurrentSong = () => {
  const currentSong = useCurrentSong()

  const title = currentSong?.title
    ?? '-------'

  const artist = currentSong?.artist
    ?? '---'

  return (
    <div className={styles.container}>
      <span className={styles.title}>
      {title}
      </span>
      <span className={styles.artist}>
      {artist}
      </span>
    </div>
  )
}

export default CurrentSong
