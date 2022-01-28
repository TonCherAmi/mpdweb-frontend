import { useState, useCallback, useLayoutEffect } from 'react'

import Thunk from '@app/common/types/Thunk'

import * as R from 'ramda'

export interface ItemNavigation<T> {
  isEmpty: boolean
  isInitial: boolean
  currentItem: Nullable<T>
  setCurrentItem: (item: T) => void
  goToNextItem: Thunk
  goToPrevItem: Thunk
  goToFirstItem: Thunk
  goToLastItem: Thunk
}

const INITIAL_INDEX = -1

const isInitial = R.equals(INITIAL_INDEX)

const useItemNavigation = <T> (
  items: ReadonlyArray<T>
): ItemNavigation<T> => {
  const [currentItemIndex, setCurrentItemIndex] = useState(INITIAL_INDEX)

  useLayoutEffect(() => {
    setCurrentItemIndex(INITIAL_INDEX)
  }, [items])

  const setCurrentItem = useCallback((item: T) => {
    const itemIndex = R.findIndex(
      R.equals(item),
      items
    )

    if (itemIndex !== -1) {
      setCurrentItemIndex(itemIndex)
    }
  }, [items])

  const isEmpty = R.isEmpty(items)

  const currentItem = isEmpty || isInitial(currentItemIndex)
    ? null
    : items[currentItemIndex]

  const goToNextItem = useCallback(() => {
    setCurrentItemIndex((currentItemIndex) => {
      if (isInitial(currentItemIndex) && !isEmpty) {
        return 0
      }

      if (currentItemIndex === items.length - 1) {
        return currentItemIndex
      }

      return currentItemIndex + 1
    })
  }, [isEmpty, items.length])

  const goToPrevItem = useCallback(() => {
    setCurrentItemIndex((currentItemIndex) => {
      if (isInitial(currentItemIndex) && !isEmpty) {
        return 0
      }

      if (currentItemIndex === 0) {
        return currentItemIndex
      }

      return currentItemIndex - 1
    })
  }, [isEmpty])

  const goToFirstItem = useCallback(() => {
    if (isEmpty) {
      return
    }

    setCurrentItemIndex(0)
  }, [isEmpty])

  const goToLastItem = useCallback(() => {
    if (isEmpty) {
      return
    }

    setCurrentItemIndex(items.length - 1)
  }, [isEmpty, items.length])

  return {
    isEmpty,
    isInitial: isInitial(currentItemIndex),
    currentItem,
    setCurrentItem,
    goToNextItem,
    goToPrevItem,
    goToFirstItem,
    goToLastItem
  }
}

export default useItemNavigation
