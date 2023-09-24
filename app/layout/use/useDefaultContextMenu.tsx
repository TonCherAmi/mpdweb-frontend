import React from 'react'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/ui/use/useContextMenu'
import useQueueActions from '@app/queue/use/useQueueActions'
import useDatabaseActions from '@app/database/use/useDatabaseActions'

const useDefaultContextMenu = () => {
  const { clear } = useQueueActions()
  const { update } = useDatabaseActions()

  return useContextMenu((onClose) => {
    const items = [
      {
        id: 'clear-queue',
        text: 'Clear Queue',
        handler: clear,
      },
      {
        id: 'update-database',
        text: 'Update Database',
        handler: update,
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

export default useDefaultContextMenu
