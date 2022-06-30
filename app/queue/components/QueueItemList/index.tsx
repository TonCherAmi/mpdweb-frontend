import React, { memo, useRef } from 'react'

import QueueItemData from '@app/queue/data/QueueItem'

import QueueItem from '@app/queue/components/QueueItem'

import PlaybackService from '@app/playback/services/PlaybackService'

import useItemNavigation from '@app/common/use/useItemNavigation'
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
  const itemNavigation = useItemNavigation(items)

  useTrackedQueueItemNavigation(items, itemNavigation)

  const currentItemRef = useRef<HTMLDivElement>(null)

  usePositionedQueueItemRef({
    isActive,
    currentItem: itemNavigation.currentItem,
    currentItemRef,
    onIsActiveChangeScrollTo,
  })

  useItemListKeybindings(itemNavigation, {
    disable: !isActive,
  })

  useQueueItemListKeybindings(itemNavigation.currentItem)

  return (
    <div className={styles.container}>
      <For of={items} body={(item) => (
        <QueueItem
          ref={isActive && item === itemNavigation.currentItem ? currentItemRef : null}
          key={item.id}
          isFocused={isActive && item === itemNavigation.currentItem}
          item={item}
          onClick={PlaybackService.play}
        />
      )} />
    </div>
  )
})

export default QueueItemList
