import React, { MouseEventHandler, useCallback } from 'react'

import Thunk from '@app/common/types/Thunk'

import useContextMenuContext from '@app/common/use/useContextMenuContext'

interface ContextMenu<E extends Element> {
  handleContextMenu: MouseEventHandler<E>
}

const useContextMenu = <E extends Element>(
  render: (onClose: Thunk) => React.ReactNode
): ContextMenu<E> => {
  const setContextMenu = useContextMenuContext()

  const handleClose = useCallback(() => {
    setContextMenu(null)
  }, [setContextMenu])

  const handleContextMenu: MouseEventHandler<E> = (mouseEvent) => {
    mouseEvent.stopPropagation()
    mouseEvent.preventDefault()

    setContextMenu({
      x: mouseEvent.clientX,
      y: mouseEvent.clientY,
      component: render(handleClose)
    })
  }

  return {
    handleContextMenu
  }
}

export default useContextMenu
