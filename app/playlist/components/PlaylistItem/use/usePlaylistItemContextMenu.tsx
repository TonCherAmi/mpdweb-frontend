import React, { useCallback } from 'react'

import Thunk from '@app/common/types/Thunk'
import PlaylistItem from '@app/playlist/dto/PlaylistItem'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/common/use/useContextMenu'
import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'

import { copy } from '@app/navigator/utils/clipboard'
import { basename } from '@app/common/utils/path'
import { wrapWithGlobalItems } from '@app/common/utils/contextmenu'

const usePlaylistItemContextMenu = (playlistItem: PlaylistItem) => {
  const { goTo } = useDatabaseViewNavigation()

  const render = useCallback((onClose: Thunk) => {
    const items = wrapWithGlobalItems([
      {
        id: 'copy',
        text: 'Copy',
        items: [
          {
            id: 'copy-basename',
            text: 'Copy Name',
            handler: () => {
              copy(
                basename(playlistItem.uri)
              )
            }
          },
          {
            id: 'copy-path',
            text: 'Copy Path',
            handler: () => copy(playlistItem.uri)
          }
        ]
      },
      {
        id: 'open-in-files',
        text: 'Open in Files',
        handler: () => goTo(playlistItem.uri)
      }
    ])

    return (
      <ContextMenu
        items={items}
        onClose={onClose}
      />
    )
  }, [playlistItem, goTo])

  return useContextMenu(render)
}

export default usePlaylistItemContextMenu
