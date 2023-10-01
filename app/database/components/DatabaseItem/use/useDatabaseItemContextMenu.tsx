import React from 'react'

import DatabaseItem from '@app/database/data/DatabaseItem'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/ui/use/useContextMenu'
import useDatabaseItemContextMenuItems from '@app/database/components/DatabaseItem/use/useDatabaseItemContextMenuItems'

const useDatabaseItemContextMenu = (item: DatabaseItem) => {
  const items = useDatabaseItemContextMenuItems(item)

  return useContextMenu((onClose) => {
    return (
      <ContextMenu
        items={items}
        onClose={onClose}
      />
    )
  })
}

export default useDatabaseItemContextMenu
