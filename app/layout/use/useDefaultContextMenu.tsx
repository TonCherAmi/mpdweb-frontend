import React, { useCallback } from 'react'

import Thunk from '@app/common/types/Thunk'

import ContextMenu from '@app/common/components/ContextMenu'

import useContextMenu from '@app/common/use/useContextMenu'

import { wrapWithGlobalItems } from '@app/common/utils/contextmenu'

const useDefaultContextMenu = () => {
  const render = useCallback((onClose: Thunk) => {
    const items = wrapWithGlobalItems([])

    return (
      <ContextMenu
        items={items}
        onClose={onClose}
      />
    )
  }, [])

  return useContextMenu(render)
}

export default useDefaultContextMenu
