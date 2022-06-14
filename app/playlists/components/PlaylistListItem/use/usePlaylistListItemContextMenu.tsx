import React from 'react'

import Handler from '@app/common/types/Handler'
import Playlist from '@app/playlists/data/Playlist'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/ui/use/useContextMenu'

import { copy } from '@app/navigator/utils/clipboard'
import { wrapWithGlobalContextMenuItems } from '@app/common/utils/contextmenu'

const usePlaylistListItemContextMenu = ({
  playlist,
  onRemoveClick,
}: { playlist: Playlist, onRemoveClick: Handler<Playlist> }) => {
  return useContextMenu((onClose) => {
    const items = wrapWithGlobalContextMenuItems([
      {
        id: 'copy',
        text: 'Copy',
        items: [
          {
            id: 'copy-name',
            text: 'Copy Name',
            handler: () => copy(playlist.name),
          },
        ],
      },
      {
        id: 'remove',
        text: 'Remove',
        handler: () => onRemoveClick(playlist),
      },
    ])

    return (
      <ContextMenu
        items={items}
        onClose={onClose}
      />
    )
  })
}

export default usePlaylistListItemContextMenu
