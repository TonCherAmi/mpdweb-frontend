import React from 'react'

import * as R from 'ramda'

import useStatusContext from '@app/status/use/useStatusContext'
import usePlaylistContext from '@app/playlist/use/usePlaylistContext'

import styles from './styles.scss'

const CurrentSong = () => {
  const status = useStatusContext()
  const playlist = usePlaylistContext()

  if (R.isNil(status) || R.isNil(status.currentSong)) {
    return null
  }

  const title = playlist[status.currentSong]
    ?.title
    ?? '-------'

  const artist = playlist[status.currentSong]
    ?.artist
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
