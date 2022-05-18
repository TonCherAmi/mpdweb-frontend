import React, { useCallback } from 'react'

import Thunk from '@app/common/types/Thunk'
import PlaylistItem from '@app/playlist/data/PlaylistItem'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/common/use/useContextMenu'
import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'

import PlaylistService from '@app/playlist/services/PlaylistService'

import { dirname } from '@app/common/utils/path'
import { wrapWithGlobalContextMenuItems } from '@app/common/utils/contextmenu'
import { getDatabaseItemContextMenuItems } from '@app/database/utils/contextmenu'

const usePlaylistItemContextMenu = (playlistItem: PlaylistItem) => {
  const { goTo } = useDatabaseViewNavigation()

  const render = useCallback((onClose: Thunk) => {
    const items = wrapWithGlobalContextMenuItems([
      ...getDatabaseItemContextMenuItems(playlistItem),
      {
        id: 'remove',
        text: 'Remove',
        handler: () => PlaylistService.delete(playlistItem.id)
      },
      {
        id: 'open-in-files',
        text: 'Open in Files',
        handler: () => {
          goTo(
            dirname(playlistItem.uri)
          )
        }
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
