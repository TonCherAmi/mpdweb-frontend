import React from 'react'

import * as R from 'ramda'

import QueueItem from '@app/queue/data/QueueItem'

import useCurrentSong from '@app/status/use/useCurrentSong'
import useQueueItemContextMenu from '@app/queue/use/useQueueItemContextMenu'

import { formatDatabaseTags } from '@app/database/utils/format'

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

const CurrentSong = ({ currentSong }: { currentSong: QueueItem }) => {
  const { handleContextMenu } = useQueueItemContextMenu(currentSong)

  const { title, artist } = formatDatabaseTags(currentSong.tags)

  return (
    <div className={styles.container} onContextMenu={handleContextMenu}>
      <span className={styles.title} title={title ?? ''}>
      {title}
      </span>
      <span className={styles.artist} title={artist ?? ''}>
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
