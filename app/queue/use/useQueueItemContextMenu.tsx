import React from 'react'

import QueueItem from '@app/queue/data/QueueItem'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/ui/use/useContextMenu'
import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'

import QueueService from '@app/queue/services/QueueService'

import { dirname } from '@app/common/utils/path'
import { wrapWithGlobalContextMenuItems } from '@app/common/utils/contextmenu'
import { getDatabaseItemContextMenuItems } from '@app/database/utils/contextmenu'

const useQueueItemContextMenu = (queueItem: QueueItem) => {
  const { goTo } = useDatabaseViewNavigation()

  return useContextMenu((onClose) => {
    const items = wrapWithGlobalContextMenuItems([
      ...getDatabaseItemContextMenuItems(queueItem),
      {
        id: 'remove',
        text: 'Remove',
        handler: () => QueueService.delete(queueItem.id),
      },
      {
        id: 'open-in-files',
        text: 'Open in Files',
        handler: () => {
          goTo(
            dirname(queueItem.uri)
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

export default useQueueItemContextMenu
