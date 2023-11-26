import { useCallback } from 'react'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'

import useItemListNavigation from '@app/common/use/useItemListNavigation'

interface ItemGridNavigation<T> {
  isEmpty: boolean
  currentItem: Nullable<T>
  goToNextItem: Thunk
  goToPrevItem: Thunk
  goToItemAbove: (rowLength: number) => void
  goToItemBelow: (rowLength: number) => void
}

const INITIAL_INDEX = -1

const isInitial = R.equals(INITIAL_INDEX)

const useItemGridNavigation = <T>(
  items: ReadonlyArray<T>,
): ItemGridNavigation<T> => {
  const { setCurrentItemIndex, ...itemListNavigation } = useItemListNavigation(items)

  const goToItemAbove = useCallback((rowLength: number) => {
    setCurrentItemIndex((currentItemIndex) => {
      if (isInitial(currentItemIndex) && !itemListNavigation.isEmpty) {
        return 0
      }

      const isTopRow = currentItemIndex <= rowLength - 1

      if (isTopRow) {
        return currentItemIndex
      }

      return currentItemIndex - rowLength
    })
  }, [itemListNavigation.isEmpty, setCurrentItemIndex])

  const goToItemBelow = useCallback((rowLength: number) => {
    setCurrentItemIndex((currentItemIndex) => {
      if (isInitial(currentItemIndex) && !itemListNavigation.isEmpty) {
        return 0
      }

      const isBottomRow = currentItemIndex >= items.length - rowLength

      if (isBottomRow) {
        return currentItemIndex
      }

      return currentItemIndex + rowLength
    })
  }, [items.length, itemListNavigation.isEmpty, setCurrentItemIndex])

  return {
    goToItemAbove,
    goToItemBelow,
    ...itemListNavigation,
  }
}

export default useItemGridNavigation
