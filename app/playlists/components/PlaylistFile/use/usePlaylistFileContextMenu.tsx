import React from 'react'

import Handler from '@app/common/types/Handler'
import DatabaseFile from '@app/database/data/DatabaseFile'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/ui/use/useContextMenu'
import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'
import useDatabaseItemContextMenuItems from '@app/database/components/DatabaseItem/use/useDatabaseItemContextMenuItems'

import { dirname } from '@app/common/utils/path'

const usePlaylistFileContextMenu = ({
  file,
  position,
  onRemoveClick,
}: { file: DatabaseFile, position: number, onRemoveClick: Handler<number> }) => {
  const { goTo } = useDatabaseViewNavigation()

  const databaseItemContextMenuItems = useDatabaseItemContextMenuItems(file)

  return useContextMenu((onClose) => {
    const items = [
      ...databaseItemContextMenuItems,
      {
        id: 'remove',
        text: 'Remove',
        handler: () => onRemoveClick(position),
      },
      {
        id: 'open-in-files',
        text: 'Open in Files',
        handler: () => {
          goTo(
            dirname(file.uri)
          )
        },
      },
    ]

    return (
      <ContextMenu
        items={items}
        onClose={onClose}
      />
    )
  })
}

export default usePlaylistFileContextMenu
