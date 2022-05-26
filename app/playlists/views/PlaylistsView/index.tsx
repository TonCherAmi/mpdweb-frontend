import React from 'react'

import Playlist from '@app/playlists/components/Playlist'
import Playlists from '@app/playlists/components/Playlists'

import usePlaylistsViewContext from '@app/playlists/views/PlaylistsView/use/usePlaylistsViewContext'

import route from './route'

import styles from './styles.scss'

const PlaylistsView = () => {
  const { playlists, selection } = usePlaylistsViewContext()

  return (
    <div className={styles.container}>
      <Playlists
        playlists={playlists}
        selectedPlaylist={selection?.playlist}
      />
      <Playlist
        playlist={selection?.playlist}
        files={selection?.files}
      />
    </div>
  )
}

export { route }

export default PlaylistsView
