import React, { memo, useRef } from 'react'

import QueueItemData from '@app/queue/data/QueueItem'

import QueueItem from '@app/queue/components/QueueItem'

import useItemListNavigation from '@app/common/use/useItemListNavigation'
import usePlaybackActions from '@app/playback/use/usePlaybackActions'
import useItemListKeybindings from '@app/keybindings/use/useItemListKeybindings'

import usePositionedQueueItemRef from './use/usePositionedQueueItemRef'
import useQueueItemListKeybindings from './use/useQueueItemListKeybindings'
import useTrackedQueueItemNavigation from './use/useTrackedQueueItemNavigation'

import styles from './styles.scss'

interface Props {
  isActive: boolean
  items: ReadonlyArray<QueueItemData>
  onIsActiveChangeScrollTo: ScrollLogicalPosition,
}

const QueueItemList = memo(({ isActive, items, onIsActiveChangeScrollTo }: Props) => {
  const itemListNavigation = useItemListNavigation(items)

  useTrackedQueueItemNavigation(items, itemListNavigation)

  const currentItemRef = useRef<HTMLDivElement>(null)

  usePositionedQueueItemRef({
    isActive,
    currentItem: itemListNavigation.currentItem,
    currentItemRef,
    onIsActiveChangeScrollTo,
  })

  useItemListKeybindings(itemListNavigation, {
    disable: !isActive,
  })

  useQueueItemListKeybindings(itemListNavigation.currentItem)

  const { play } = usePlaybackActions()

  return (
    <div className={styles.container}>
      <For of={items} body={(item) => (
        <QueueItem
          ref={isActive && item === itemListNavigation.currentItem ? currentItemRef : null}
          key={item.id}
          isFocused={isActive && item === itemListNavigation.currentItem}
          item={item}
          onClick={play}
        />
      )} />
    </div>
  )
})

export default QueueItemList
