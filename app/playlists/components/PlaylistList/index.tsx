import React, { useCallback } from 'react'

import * as R from 'ramda'

import Playlist from '@app/playlists/data/Playlist'

import PlaylistListItem from '@app/playlists/components/PlaylistListItem'

import useQueueActions from '@app/queue/use/useQueueActions'
import usePlaylistsViewNavigation from '@app/playlists/views/PlaylistsView/use/usePlaylistsViewNavigation'

import PlaylistService from '@app/playlists/sevices/PlaylistService'

import styles from './styles.scss'

interface Props {
  playlists: ReadonlyArray<Playlist>
  selectedPlaylist: Nullable<Playlist>
}

const PlaylistList = ({ playlists, selectedPlaylist }: Props) => {
  const isActive = R.equals(selectedPlaylist)

  const { goTo } = usePlaylistsViewNavigation()

  const handleItemClick = useCallback((playlist) => {
    goTo(playlist.name)
  }, [goTo])

  const handleItemRemoveClick = useCallback((playlist: Playlist) => {
    PlaylistService.delete(playlist.name)
  }, [])

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
          onRemoveClick={handleItemRemoveClick}
        />
      )} />
    </div>
  )
}

export default PlaylistList
