import React from 'react'

import * as R from 'ramda'

import PlaylistItem from '@app/playlist/dto/PlaylistItem'

import useCurrentSong from '@app/status/use/useCurrentSong'
import usePlaylistItemContextMenu from '@app/playlist/use/usePlaylistItemContextMenu'

import styles from './styles.scss'

const CurrentSongPlaceholder = () => (
  <div className={styles.container}>
    <span className={styles.title}>
    -------
    </span>
    <span className={styles.artist}>
    ---
    </span>
  </div>
)

const CurrentSong = ({ currentSong }: { currentSong: PlaylistItem }) => {
  const { handleContextMenu } = usePlaylistItemContextMenu(currentSong)

  const title = currentSong.title
  const artist = currentSong.artist

  return (
    <div className={styles.container} onContextMenu={handleContextMenu}>
      <span className={styles.title}>
      {title}
      </span>
      <span className={styles.artist}>
      {artist}
      </span>
    </div>
  )
}

const CurrentSongWrapper = () => {
  const currentSong = useCurrentSong()

  if (R.isNil(currentSong)) {
    return (
      <CurrentSongPlaceholder />
    )
  }

  return (
    <CurrentSong currentSong={currentSong} />
  )
}

export default CurrentSongWrapper
