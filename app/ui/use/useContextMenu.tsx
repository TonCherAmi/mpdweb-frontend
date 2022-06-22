import React, { MouseEventHandler } from 'react'

import Thunk from '@app/common/types/Thunk'

import useContextMenuContext from '@app/ui/use/useContextMenuContext'

interface ContextMenu<E extends Element> {
  handleContextMenu: MouseEventHandler<E>
}

const isEventTargetIgnored = (target: unknown): boolean => (
  target instanceof HTMLInputElement
    || target instanceof HTMLTextAreaElement
    || target instanceof HTMLImageElement
)

const useContextMenu = <E extends Element>(
  render: (onClose: Thunk) => React.ReactNode
): ContextMenu<E> => {
  const setContextMenu = useContextMenuContext()

  const handleClose = () => {
    setContextMenu(null)
  }

  const handleContextMenu: MouseEventHandler<E> = (mouseEvent) => {
    if (isEventTargetIgnored(mouseEvent.target)) {
      return
    }

    mouseEvent.stopPropagation()
    mouseEvent.preventDefault()

    setContextMenu({
      x: mouseEvent.clientX,
      y: mouseEvent.clientY,
      component: render(handleClose),
    })
  }

  return {
    handleContextMenu,
  }
}

export default useContextMenu
