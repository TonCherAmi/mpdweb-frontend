import { useState, HTMLAttributes, useLayoutEffect, RefObject } from 'react'

import * as R from 'ramda'

import { getInsetStyle } from '@app/common/components/ContextMenu/utils/positioning'

const useContextMenuStyle = ({
  containerRef,
  parentRect,
  sourceItemRect
}: { containerRef: RefObject<HTMLDivElement>, parentRect: Nullable<DOMRect>, sourceItemRect: Nullable<DOMRect> }) => {
  const [style, setStyle] = useState<HTMLAttributes<HTMLDivElement>['style']>()

  useLayoutEffect(() => {
    if (R.isNil(parentRect) || R.isNil(sourceItemRect) || R.isNil(containerRef.current)) {
      return
    }

    const documentRect = document.documentElement.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()

    const insetStyle = getInsetStyle({
      documentRect,
      parentRect,
      containerRect,
      sourceItemRect
    })

    setStyle({ position: 'absolute', ...insetStyle })
  }, [containerRef, parentRect, sourceItemRect])

  return style
}

export default useContextMenuStyle
