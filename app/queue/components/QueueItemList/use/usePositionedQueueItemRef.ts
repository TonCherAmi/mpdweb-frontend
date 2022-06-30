import React, { useRef, useLayoutEffect, useEffect } from 'react'

import * as R from 'ramda'

import QueueItem from '@app/queue/data/QueueItem'

interface PositionedQueueItemRefOptions {
  isActive: boolean
  currentItemRef: React.RefObject<HTMLDivElement>
  currentItem: Nullable<QueueItem>
  onIsActiveChangeScrollTo: ScrollLogicalPosition
}

const usePositionedQueueItemRef = ({
  isActive,
  currentItem,
  currentItemRef,
  onIsActiveChangeScrollTo,
}: PositionedQueueItemRefOptions) => {
  const scrollLogicalPositionRef = useRef<Nullable<ScrollLogicalPosition>>(null)

  useLayoutEffect(() => {
    if (!isActive) {
      return
    }

    scrollLogicalPositionRef.current = 'nearest'
  }, [currentItem, isActive])

  useLayoutEffect(() => {
    scrollLogicalPositionRef.current = onIsActiveChangeScrollTo
  }, [isActive, onIsActiveChangeScrollTo])

  useLayoutEffect(() => {
    if (!R.isNil(scrollLogicalPositionRef.current)) {
      currentItemRef.current?.scrollIntoView({ block: scrollLogicalPositionRef.current })
    }
  })

  useEffect(() => {
    scrollLogicalPositionRef.current = null
  })
}

export default usePositionedQueueItemRef
