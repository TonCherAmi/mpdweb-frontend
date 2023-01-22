import React, { useCallback } from 'react'

import * as R from 'ramda'

import Playlist from '@app/playlists/data/Playlist'

import PlaylistListItem from '@app/playlists/components/PlaylistListItem'

import useQueueActions from '@app/queue/use/useQueueActions'
import usePlaylistActions from '@app/playlists/use/usePlaylistActions'
import usePlaylistsViewNavigation from '@app/playlists/views/PlaylistsView/use/usePlaylistsViewNavigation'

import styles from './styles.scss'

interface Props {
  playlists: ReadonlyArray<Playlist>
  selectedPlaylist: Nullable<Playlist>
}

const PlaylistList = ({ playlists, selectedPlaylist }: Props) => {
  const isActive = R.equals(selectedPlaylist)

  const { goTo } = usePlaylistsViewNavigation()

  const handleItemClick = useCallback((playlist: Playlist) => {
    goTo(playlist.name)
  }, [goTo])

  const { remove } = usePlaylistActions()
  const { add, replace } = useQueueActions()

  return (
    <div className={styles.container}>
      <For of={playlists} body={(playlist) => (
        <PlaylistListItem
          key={playlist.name}
          isActive={isActive(playlist)}
          playlist={playlist}
          onClick={handleItemClick}
          onAddClick={add}
          onPlayClick={replace}
          onRemoveClick={remove}
        />
      )} />
    </div>
  )
}

export default PlaylistList
