import React, { useCallback } from 'react'

import Thunk from '@app/common/types/Thunk'
import DatabaseItem from '@app/database/dto/DatabaseItem'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/common/use/useContextMenu'

import { wrapWithGlobalContextMenuItems } from '@app/common/utils/contextmenu'
import { getDatabaseItemContextMenuItems } from '@app/database/utils/contextmenu'

const useDatabaseItemContextMenu = (databaseItem: DatabaseItem) => {
  const render = useCallback((onClose: Thunk) => {
    const items = wrapWithGlobalContextMenuItems(
      getDatabaseItemContextMenuItems(databaseItem)
    )

    return (
      <ContextMenu
        items={items}
        onClose={onClose}
      />
    )
  }, [databaseItem])

  return useContextMenu(render)
}

export default useDatabaseItemContextMenu
