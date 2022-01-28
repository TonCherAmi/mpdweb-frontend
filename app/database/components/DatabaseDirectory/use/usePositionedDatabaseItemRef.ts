import React, { useRef, useEffect, useLayoutEffect } from 'react'

import * as R from 'ramda'

import DatabaseItem from '@app/database/dto/DatabaseItem'

import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'

const usePositionedDatabaseItemRef = (
  currentItem: DatabaseItem,
  { isActive, isSearchHidden }: { isActive: boolean, isSearchHidden: boolean }
): React.RefObject<HTMLDivElement> => {
  const itemRef = useRef<HTMLDivElement>(null)

  const scrollLogicalPositionRef = useRef<Nullable<ScrollLogicalPosition>>(null)

  const uiInteractionMode = useUiInteractionModeContext()

  useLayoutEffect(() => {
    if (isActive) {
      scrollLogicalPositionRef.current = 'nearest'
    }
  }, [isActive, currentItem])

  useLayoutEffect(() => {
    if (isActive && uiInteractionMode.isKeyboard) {
      scrollLogicalPositionRef.current = 'nearest'
    }
  }, [isActive, uiInteractionMode])

  useLayoutEffect(() => {
    scrollLogicalPositionRef.current = 'center'
  }, [])

  useLayoutEffect(() => {
    if (!isActive && !isSearchHidden) {
      scrollLogicalPositionRef.current = 'center'
    }
  }, [isActive, isSearchHidden])

  useLayoutEffect(() => {
    if (isSearchHidden) {
      scrollLogicalPositionRef.current = 'center'
    }
  }, [isSearchHidden])

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
