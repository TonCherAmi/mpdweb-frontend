import React, { useCallback, memo } from 'react'

import Playlist from '@app/playlists/data/Playlist'
import DatabaseFile from '@app/database/data/DatabaseFile'

import PlaylistFile from '@app/playlists/components/PlaylistFile'

import useQueueActions from '@app/queue/use/useQueueActions'

import PlaylistService from '@app/playlists/sevices/PlaylistService'

import styles from './styles.scss'

interface Props {
  playlist: Playlist
  files: ReadonlyArray<DatabaseFile>
}

const PlaylistFileList = memo(({ playlist, files }: Props) => {
  const { replace } = useQueueActions()

  const handlePlaylistItemRemoveClick = useCallback((position: number) => {
    PlaylistService.deleteFiles(playlist.name, [position])
  }, [playlist.name])

  return (
    <div className={styles.container}>
      <For of={files} body={(file, index) => (
        <PlaylistFile
          key={index + file.uri}
          file={file}
          position={index ?? -1}
          onClick={replace}
          onRemoveClick={handlePlaylistItemRemoveClick}
        />
      )} />
    </div>
  )
})

export default PlaylistFileList
