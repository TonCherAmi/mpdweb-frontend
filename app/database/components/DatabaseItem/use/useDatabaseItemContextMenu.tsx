import React from 'react'

import DatabaseItem from '@app/database/data/DatabaseItem'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/ui/use/useContextMenu'
import useDatabaseActions from '@app/database/use/useDatabaseActions'

import { wrapWithGlobalContextMenuItems } from '@app/common/utils/contextmenu'
import { getDatabaseItemContextMenuItems } from '@app/database/utils/contextmenu'

const useDatabaseItemContextMenu = (item: DatabaseItem) => {
  const { update } = useDatabaseActions()

  return useContextMenu((onClose) => {
    const items = wrapWithGlobalContextMenuItems([
      ...getDatabaseItemContextMenuItems(item),
      {
        id: 'update',
        text: 'Update',
        handler: () => update(item.uri),
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

export default useDatabaseItemContextMenu
