import React from 'react'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/ui/use/useContextMenu'

const useDefaultContextMenu = () => {
  return useContextMenu((onClose) => {
    const items = []

    return (
      <ContextMenu
        items={items}
        onClose={onClose}
      />
    )
  })
}

export default useDefaultContextMenu
