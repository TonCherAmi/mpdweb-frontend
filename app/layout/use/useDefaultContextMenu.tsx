import React from 'react'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/ui/use/useContextMenu'

import { wrapWithGlobalContextMenuItems } from '@app/common/utils/contextmenu'

const useDefaultContextMenu = () => {
  return useContextMenu((onClose) => {
    const items = wrapWithGlobalContextMenuItems([])

    return (
      <ContextMenu
        items={items}
        onClose={onClose}
      />
    )
  })
}

export default useDefaultContextMenu
