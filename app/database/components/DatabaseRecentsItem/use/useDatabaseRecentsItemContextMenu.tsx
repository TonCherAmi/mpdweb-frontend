import React from 'react'

import DatabaseFile from '@app/database/data/DatabaseFile'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/ui/use/useContextMenu'
import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'
import useDatabaseItemContextMenuItems from '@app/database/components/DatabaseItem/use/useDatabaseItemContextMenuItems'

import { dirname } from '@app/common/utils/path'

const useDatabaseRecentsItemContextMenu = (item: DatabaseFile) => {
  const databaseItemContextMenuItems = useDatabaseItemContextMenuItems(item)

  const { goTo } = useDatabaseViewNavigation()

  return useContextMenu((onClose) => {
    const items = [

      ...databaseItemContextMenuItems, {
        id: 'open-in-files',
        text: 'Open in Files',
        handler: () => {
          goTo(dirname(item.uri))
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

export default useDatabaseRecentsItemContextMenu
