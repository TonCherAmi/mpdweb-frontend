import React from 'react'
import { Route } from 'react-router-dom'

import Playlist from '@app/playlists/components/Playlist'
import PlaylistsGrid from '@app/playlists/components/PlaylistsGrid'

import usePlaylistsViewContext from '@app/playlists/views/PlaylistsView/use/usePlaylistsViewContext'

import route from './route'

import styles from './styles.scss'

const PlaylistsView = () => {
  const { playlists, selection } = usePlaylistsViewContext()

  return (
    <div className={styles.container}>
      <Route exact path={route.path}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Playlists
          </h2>
        </div>
        <PlaylistsGrid items={playlists} />
      </Route>
      <Route path={route.match.pattern}>
        <Playlist
          playlist={selection?.playlist}
          files={selection?.songs}
        />
      </Route>
    </div>
  )
}

export { route }

export default PlaylistsView
