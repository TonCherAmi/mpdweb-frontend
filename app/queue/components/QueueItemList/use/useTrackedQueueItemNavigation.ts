import { useEffect, useRef, useLayoutEffect } from 'react'

import * as R from 'ramda'

import QueueItem from '@app/queue/data/QueueItem'

import { ItemNavigation } from '@app/common/use/useItemNavigation'

import { binarySearch } from '@app/common/utils/array'

const useTrackedQueueItemNavigation = (
  items: ReadonlyArray<QueueItem>,
  itemNavigation: ItemNavigation<QueueItem>,
) => {
  const currentItemCacheRef = useRef<Nullable<QueueItem>>(null)

  const { setCurrentItem } = itemNavigation

  useLayoutEffect(() => {
    if (R.isEmpty(items)) {
      return
    }

    if (R.isNil(currentItemCacheRef.current)) {
      setCurrentItem(
        R.head(items)
      )

      return
    }

    const possibleIndex = binarySearch(items, currentItemCacheRef.current?.id, R.prop('id'))

    const actualIndex = possibleIndex >= 0
      ? possibleIndex
      : R.clamp(0, items.length - 1, Math.abs(possibleIndex) - 1)

    setCurrentItem(items[actualIndex])
  }, [items, setCurrentItem])

  useEffect(() => {
    currentItemCacheRef.current = itemNavigation.currentItem
  }, [itemNavigation.currentItem])
}

export default useTrackedQueueItemNavigation
