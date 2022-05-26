import React from 'react'

import * as R from 'ramda'

import DatabaseFile from '@app/database/data/DatabaseFile'
import PlaylistData from '@app/playlists/data/Playlist'

import PlaylistHeader from '@app/playlists/components/PlaylistHeader'
import PlaylistFileList from '@app/playlists/components/PlaylistFileList'

import styles from './styles.scss'

interface Props {
  playlist: Nullable<PlaylistData>
  files: Nullable<ReadonlyArray<DatabaseFile>>
}

const Playlist = ({ playlist, files }: Props) => {
  if (R.isNil(playlist) || R.isNil(files)) {
    return null
  }

  return (
    <div className={styles.container}>
      <PlaylistHeader
        playlist={playlist}
        files={files}
      />
      <PlaylistFileList playlist={playlist} files={files} />
    </div>
  )
}

export default Playlist
