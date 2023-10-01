import React, { MouseEventHandler } from 'react'

import Thunk from '@app/common/types/Thunk'

import useContextMenuContext from '@app/ui/use/useContextMenuContext'

import { isSelectionActive } from '@app/navigator/utils/selection'

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

  const handleContextMenu: MouseEventHandler<E> = (event) => {
    if (isEventTargetIgnored(event.target) || isSelectionActive()) {
      return
    }

    event.stopPropagation()
    event.preventDefault()

    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      component: render(handleClose),
    })
  }

  return {
    handleContextMenu,
  }
}

export default useContextMenu
