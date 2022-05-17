import React, { useCallback } from 'react'

import Thunk from '@app/common/types/Thunk'
import DatabaseItem from '@app/database/dto/DatabaseItem'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/common/use/useContextMenu'

import { copy } from '@app/navigator/utils/clipboard'
import { basename } from '@app/common/utils/path'
import { wrapWithGlobalItems } from '@app/common/utils/contextmenu'

const useDatabaseItemContextMenu = (databaseItem: DatabaseItem) => {
  const render = useCallback((onClose: Thunk) => {
    const items = wrapWithGlobalItems([
      {
        id: 'copy',
        text: 'Copy',
        items: [
          {
            id: 'copy-basename',
            text: 'Copy Name',
            handler: () => {
              copy(
                basename(databaseItem.uri)
              )
            }
          },
          {
            id: 'copy-path',
            text: 'Copy Path',
            handler: () => copy(databaseItem.uri)
          }
        ]
      }
    ])

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
