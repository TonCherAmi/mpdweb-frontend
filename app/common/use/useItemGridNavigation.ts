import { useCallback } from 'react'

import * as R from 'ramda'

import useItemListNavigation, { ItemListNavigation } from '@app/common/use/useItemListNavigation'

export interface ItemGridNavigation<T> extends ItemListNavigation<T>{
  goToItemAbove: (rowLength: number) => void
  goToItemBelow: (rowLength: number) => void
}

const INITIAL_INDEX = -1

const isInitial = R.equals(INITIAL_INDEX)

const useItemGridNavigation = <T>(
  items: ReadonlyArray<T>,
): ItemGridNavigation<T> => {
  const itemListNavigation = useItemListNavigation(items)

  const { isEmpty, setCurrentItemIndex } = itemListNavigation

  const goToItemAbove = useCallback((rowLength: number) => {
    setCurrentItemIndex((currentItemIndex) => {
      if (isInitial(currentItemIndex) && !isEmpty) {
        return 0
      }

      const isTopRow = currentItemIndex <= rowLength - 1

      if (isTopRow) {
        return currentItemIndex
      }

      return currentItemIndex - rowLength
    })
  }, [isEmpty, setCurrentItemIndex])

  const goToItemBelow = useCallback((rowLength: number) => {
    setCurrentItemIndex((currentItemIndex) => {
      if (isInitial(currentItemIndex) && !isEmpty) {
        return 0
      }

      const isBottomRow = currentItemIndex >= items.length - rowLength

      if (isBottomRow) {
        return currentItemIndex
      }

      return currentItemIndex + rowLength
    })
  }, [items.length, isEmpty, setCurrentItemIndex])

  return {
    goToItemAbove,
    goToItemBelow,
    ...itemListNavigation,
  }
}

export default useItemGridNavigation
