import React, { useRef, useEffect, useLayoutEffect } from 'react'

import * as R from 'ramda'

import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'

interface Options {
  key: unknown
  ref: React.RefObject<HTMLDivElement>
}

const usePositionedListItem = ({ key, ref }: Options) => {
  const scrollLogicalPositionRef = useRef<Nullable<ScrollLogicalPosition>>(null)

  const uiInteractionMode = useUiInteractionModeContext()

  useLayoutEffect(() => {
    scrollLogicalPositionRef.current = 'nearest'
  }, [key])

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
      ref.current?.scrollIntoView({ block: scrollLogicalPositionRef.current })
    }
  })

  useEffect(() => {
    scrollLogicalPositionRef.current = null
  })
}

export default usePositionedListItem
