import React from 'react'

import QueueItem from '@app/queue/data/QueueItem'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/ui/use/useContextMenu'
import useQueueActions from '@app/queue/use/useQueueActions'
import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'

import { dirname } from '@app/common/utils/path'
import { wrapWithGlobalContextMenuItems } from '@app/common/utils/contextmenu'
import { getDatabaseItemContextMenuItems } from '@app/database/utils/contextmenu'

const useQueueItemContextMenu = (item: QueueItem) => {
  const { goTo } = useDatabaseViewNavigation()

  const { remove } = useQueueActions()

  return useContextMenu((onClose) => {
    const items = wrapWithGlobalContextMenuItems([
      ...getDatabaseItemContextMenuItems(item),
      {
        id: 'remove',
        text: 'Remove',
        handler: () => remove(item),
      },
      {
        id: 'open-in-files',
        text: 'Open in Files',
        handler: () => {
          goTo(dirname(item.uri))
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

export default useQueueItemContextMenu
