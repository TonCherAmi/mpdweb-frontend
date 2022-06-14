import React from 'react'

import DatabaseItem from '@app/database/data/DatabaseItem'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/ui/use/useContextMenu'

import { wrapWithGlobalContextMenuItems } from '@app/common/utils/contextmenu'
import { getDatabaseItemContextMenuItems } from '@app/database/utils/contextmenu'

const useDatabaseItemContextMenu = (databaseItem: DatabaseItem) => {
  return useContextMenu((onClose) => {
    const items = wrapWithGlobalContextMenuItems(
      getDatabaseItemContextMenuItems(databaseItem)
    )

    return (
      <ContextMenu
        items={items}
        onClose={onClose}
      />
    )
  })
}

export default useDatabaseItemContextMenu
