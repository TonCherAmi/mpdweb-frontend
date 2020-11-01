import React from 'react'
import { observer } from 'mobx-react'

import * as R from "ramda"

import StatusStore from "@app/status/stores/StatusStore"
import PlaylistStore from '@app/playlist/stores/PlaylistStore'

import styles from './styles.scss'

const CurrentSong = () => {
  const status = StatusStore.value
  const playlistItems = PlaylistStore.items

  if (R.isNil(status) || R.isNil(playlistItems)) {
    return null
  }

  const playlistItem = PlaylistStore.items[status.currentSong]

  if (R.isNil(playlistItem)) {
    return null
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>
        {playlistItem.title}
      </span>
      <span className={styles.artist}>
        {playlistItem.artist}
      </span>
    </div>
  )
}

export default observer(CurrentSong)
