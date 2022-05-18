import { useRef, useEffect, RefObject, useLayoutEffect } from 'react'

import * as R from 'ramda'

import DatabaseItem from '@app/database/data/DatabaseItem'

import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'

const usePositionedDatabaseItemRef = (currentItem: Nullable<DatabaseItem>): RefObject<HTMLDivElement> => {
  const itemRef = useRef<HTMLDivElement>(null)

  const scrollLogicalPositionRef = useRef<Nullable<ScrollLogicalPosition>>(null)

  const uiInteractionMode = useUiInteractionModeContext()

  useLayoutEffect(() => {
    scrollLogicalPositionRef.current = 'nearest'
  }, [currentItem])

  useLayoutEffect(() => {
    if (uiInteractionMode.isKeyboard) {
      scrollLogicalPositionRef.current = 'nearest'
    }
  }, [uiInteractionMode.isKeyboard])

  useLayoutEffect(() => {
    scrollLogicalPositionRef.current = 'center'
  }, [])

  useLayoutEffect(() => {
    if (!R.isNil(scrollLogicalPositionRef.current)) {
      itemRef.current?.scrollIntoView({ block: scrollLogicalPositionRef.current })
    }
  })

  useEffect(() => {
    scrollLogicalPositionRef.current = null
  })

  return itemRef
}

export default usePositionedDatabaseItemRef
