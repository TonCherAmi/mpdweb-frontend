import React, { useCallback, memo, useRef } from 'react'

import Playlist from '@app/playlists/data/Playlist'
import DatabaseFile from '@app/database/data/DatabaseFile'

import PlaylistFile from '@app/playlists/components/PlaylistFile'

import useQueueActions from '@app/queue/use/useQueueActions'
import useFocusGroupActive from '@app/ui/use/useFocusGroupActive'
import usePlaylistActions from '@app/playlists/use/usePlaylistActions'
import useItemListNavigation from '@app/common/use/useItemListNavigation'
import usePositionedListItem from '@app/common/use/usePositionedListItem'
import useItemListKeybindings from '@app/keybindings/use/useItemListKeybindings'
import useDatabaseItemListKeybindings from '@app/database/use/useDatabaseItemListKeybindings'

import usePlaylistFileKeyMap from './use/usePlaylistFileKeyMap'
import usePlaylistFileListKeybindings from './use/usePlaylistFileListKeybindings'

import styles from './styles.scss'

interface Props {
  playlist: Playlist
  files: ReadonlyArray<DatabaseFile>
}

const PlaylistFileList = memo(({ playlist, files }: Props) => {
  const itemListNavigation = useItemListNavigation(files, {
    listChangeBehavior: 'keep',
  })

  const isFocusGroupActive = useFocusGroupActive()

  const { replace } = useQueueActions()

  const { removeSongs } = usePlaylistActions()

  const currentItemRef = useRef<HTMLDivElement>(null)

  usePositionedListItem({
    ref: currentItemRef,
    key: itemListNavigation.currentItem,
  })

  const getItemRef = (item: DatabaseFile): Nullable<typeof currentItemRef> => {
    if (!isFocusGroupActive || item !== itemListNavigation.currentItem) {
      return null
    }

    return currentItemRef
  }

  useItemListKeybindings(itemListNavigation)
  useDatabaseItemListKeybindings(itemListNavigation)
  usePlaylistFileListKeybindings(playlist, itemListNavigation)

  const fileToKey = usePlaylistFileKeyMap(files)

  const handleReplace = useCallback((item: DatabaseFile) => {
    replace([item])
  }, [replace])

  const handlePlaylistItemRemoveClick = useCallback((position: number) => {
    removeSongs(playlist, [position])
  }, [playlist, removeSongs])

  return (
    <div className={styles.container}>
      <For of={files} body={(file, index) => (
        <PlaylistFile
          key={fileToKey.get(file)}
          ref={getItemRef(file)}
          isFocused={itemListNavigation.currentItem === file && isFocusGroupActive}
          file={file}
          position={index ?? -1}
          onClick={handleReplace}
          onRemoveClick={handlePlaylistItemRemoveClick}
        />
      )} />
    </div>
  )
})

export default PlaylistFileList
