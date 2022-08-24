import React, { useRef, useLayoutEffect, useState } from 'react'

import * as R from 'ramda'

import Button from '@app/common/components/Button'
import QueueInfo from '@app/queue/components/QueueInfo'
import QueueItemList from '@app/queue/components/QueueItemList'

import useAnyFocusScopeActive from '@app/ui/use/useAnyFocusScopeActive'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'

import usePartitionedQueue from './use/usePartitionedQueue'
import useFocusedQueuePartition from './use/useFocusedQueuePartition'

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

  const [focusedPartition, toggleFocusedPartition] = useFocusedQueuePartition(prev, next)

  const isActive = useAnyFocusScopeActive(['queue'])

  useFocusScopeGroupedKeybindings({
    QUEUE_FOCUSED_PARTITION_TOGGLE: toggleFocusedPartition,
  }, { disable: R.isEmpty(prev) || R.isEmpty(next) })

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
            <QueueItemList
              isActive={isActive && focusedPartition === 'prev'}
              items={prev}
              onIsActiveChangeScrollTo="end"
            />
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
          <QueueItemList
            isActive={isActive && focusedPartition === 'next'}
            items={next}
            onIsActiveChangeScrollTo="start"
          />
        </div>
      </div>
      <QueueInfo className={styles.info} />
    </div>
  )
}

export default Queue
