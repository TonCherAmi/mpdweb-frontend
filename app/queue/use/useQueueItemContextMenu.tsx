import React, { useCallback } from 'react'

import Thunk from '@app/common/types/Thunk'
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

  const render = useCallback((onClose: Thunk) => {
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
  }, [queueItem, goTo])

  return useContextMenu(render)
}

export default useQueueItemContextMenu
