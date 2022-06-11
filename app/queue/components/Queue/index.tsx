import React, { useRef, useLayoutEffect, useState } from 'react'

import * as R from 'ramda'

import Button from '@app/common/components/Button'
import QueueInfo from '@app/queue/components/QueueInfo'
import QueueItemList from '@app/queue/components/QueueItemList'

import usePartitionedQueue from './use/usePartitionedQueue'

import styles from './styles.scss'

const getScrollButtonText = R.prop(R.__, {
  aligned: 'History',
  lower: 'History',
  higher: 'To top',
})

const Queue = () => {
  const nextContainerRef = useRef<HTMLDivElement>(null)
  const historyContainerRef = useRef<HTMLDivElement>(null)
  const scrollableContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    nextContainerRef.current?.scrollIntoView()
  }, [])

  const { prev, next } = usePartitionedQueue()

  const prevHistoryHeightRef = useRef(0)

  useLayoutEffect(() => {
    if (R.isNil(scrollableContainerRef.current) || R.isNil(historyContainerRef.current)) {
      return
    }

    const prevHeight = prevHistoryHeightRef.current

    prevHistoryHeightRef.current = historyContainerRef.current.offsetHeight

    // according to the CSS Scroll Snap spec if content
    // is added, moved, deleted or resized the scroll offset
    // will be adjusted to maintain the resting on that snap point
    // --
    // this behavior is not yet implemented in Firefox (https://bugzilla.mozilla.org/show_bug.cgi?id=1530253)
    // therefore we're checking whether the scroll offset has been adjusted and if it hasn't
    // we're manually re-snapping to the 'up next' container
    const currentScrollDifference = Math.abs(
      scrollableContainerRef.current.scrollTop - historyContainerRef.current.offsetHeight
    )

    if (currentScrollDifference <= 5) {
      return
    }

    // snap to the 'up next' point if we were snapped to it before the history length changed
    const prevScrollDifference = Math.abs(scrollableContainerRef.current.scrollTop - prevHeight)

    if (prevScrollDifference <= 5) {
      nextContainerRef.current?.scrollIntoView()
    }
  }, [prev.length])

  const [
    nextContainerTopAlignment,
    setNextContainerTopAlignment,
  ] = useState<'aligned' | 'lower' | 'higher'>('aligned')

  const handleScroll = () => {
    if (R.isNil(nextContainerRef.current) || R.isNil(scrollableContainerRef.current)) {
      return
    }

    const scrollOffset = nextContainerRef.current.offsetTop
      - scrollableContainerRef.current.offsetTop
      - scrollableContainerRef.current.scrollTop

    setNextContainerTopAlignment(
      Math.abs(scrollOffset) <= 5
        ? 'aligned'
        : scrollOffset < 0 ? 'higher' : 'lower'
    )
  }

  const handleScrollClick = () => {
    const ref = nextContainerTopAlignment === 'aligned'
      ? historyContainerRef
      : nextContainerRef

    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const shouldShowHistory = !R.isEmpty(prev)

  return (
    <div className={styles.container}>
      <div ref={scrollableContainerRef} className={styles.scrollable} onScroll={handleScroll}>
        <If condition={shouldShowHistory}>
          <div ref={historyContainerRef} className={styles.prev}>
            <div className={styles.header}>
              <h4 className={styles.heading}>History</h4>
              <Button
                className={styles.button}
                onClick={handleScrollClick}
              >
                Hide
              </Button>
            </div>
            <QueueItemList items={prev} />
          </div>
        </If>
        <div ref={nextContainerRef} className={styles.next}>
          <div className={styles.header}>
            <h4 className={styles.heading}>Up Next</h4>
            <If condition={shouldShowHistory}>
              <Button
                className={styles.button}
                onClick={handleScrollClick}
              >
                {getScrollButtonText(nextContainerTopAlignment)}
              </Button>
            </If>
          </div>
          <QueueItemList items={next} />
        </div>
        {/* this snap point is needed because Firefox is overzealous
          * about proximity based scroll-snapping and sometimes doesn't
          * let you scroll all the way down */}
        <div className={styles.end} />
      </div>
      <QueueInfo className={styles.info} />
    </div>
  )
}

export default Queue
