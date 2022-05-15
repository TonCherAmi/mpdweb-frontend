import React, { MouseEventHandler } from 'react'

import Thunk from '@app/common/types/Thunk'

import useContextMenuContext from '@app/common/use/useContextMenuContext'

interface ContextMenu<E extends Element> {
  handleContextMenu: MouseEventHandler<E>
}

const useContextMenu = <E extends Element>(
  render: (onClose: Thunk) => React.ReactNode
): ContextMenu<E> => {
  const setContextMenu = useContextMenuContext()

  const handleContextMenu: MouseEventHandler<E> = (mouseEvent) => {
    mouseEvent.stopPropagation()
    mouseEvent.preventDefault()

    setContextMenu({
      x: mouseEvent.clientX,
      y: mouseEvent.clientY,
      component: render(() => setContextMenu(null))
    })
  }

  return {
    handleContextMenu
  }
}

export default useContextMenu
