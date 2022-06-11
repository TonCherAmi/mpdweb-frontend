import { useLayoutEffect, useState, HTMLAttributes, RefObject } from 'react'

import * as R from 'ramda'

import { ContextMenu } from '@app/common/contexts/ContextMenuContext'

import { getInsetStyle } from '@app/common/providers/ContextMenuProvider/utils/positioning'

const useContextMenuContainerStyle = ({
  containerRef,
  contextMenu,
}: { containerRef: RefObject<HTMLDivElement>, contextMenu: Nullable<ContextMenu> }) => {
  const [style, setStyle] = useState<HTMLAttributes<HTMLDivElement>['style']>()

  useLayoutEffect(() => {
    if (R.isNil(containerRef.current) || R.isNil(contextMenu)) {
      return
    }

    const documentRect = document.documentElement.getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect()

    const insetStyle = getInsetStyle({
      documentRect,
      containerRect,
      contextMenuX: contextMenu.x,
      contextMenuY: contextMenu.y,
    })

    setStyle(insetStyle)
  }, [containerRef, contextMenu])

  return style
}

export default useContextMenuContainerStyle
