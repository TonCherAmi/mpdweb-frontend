import React from 'react'

import Handler from '@app/common/types/Handler'
import DatabaseFile from '@app/database/data/DatabaseFile'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/ui/use/useContextMenu'
import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'

import { dirname } from '@app/common/utils/path'
import { wrapWithGlobalContextMenuItems } from '@app/common/utils/contextmenu'
import { getDatabaseItemContextMenuItems } from '@app/database/utils/contextmenu'

const usePlaylistFileContextMenu = ({
  file,
  position,
  onRemoveClick,
}: { file: DatabaseFile, position: number, onRemoveClick: Handler<number> }) => {
  const { goTo } = useDatabaseViewNavigation()

  return useContextMenu((onClose) => {
    const items = wrapWithGlobalContextMenuItems([
      ...getDatabaseItemContextMenuItems(file),
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
    ])

    return (
      <ContextMenu
        items={items}
        onClose={onClose}
      />
    )
  })
}

export default usePlaylistFileContextMenu
