import React, { useState, useCallback, useLayoutEffect } from 'react'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'

export interface ItemListNavigation<T> {
  isEmpty: boolean
  isInitial: boolean
  currentItem: Nullable<T>
  currentItemIndex: Nullable<number>
  goToNextItem: Thunk
  goToPrevItem: Thunk
  goToFirstItem: Thunk
  goToLastItem: Thunk
  setCurrentItem: (item: Nullable<T>) => void
  setCurrentItemIndex: React.Dispatch<React.SetStateAction<number>>
}

interface Options {
  listChangeBehavior?: 'reset' | 'keep'
}

const INITIAL_INDEX = -1

const isInitial = R.equals(INITIAL_INDEX)

const useItemListNavigation = <T>(items: ReadonlyArray<T>, {
  listChangeBehavior = 'reset',
}: Options = {}): ItemListNavigation<T> => {
  const [currentItemIndex, setCurrentItemIndex] = useState(INITIAL_INDEX)

  useLayoutEffect(() => {
    if (listChangeBehavior === 'reset') {
      setCurrentItemIndex(INITIAL_INDEX)
    } else if (listChangeBehavior === 'keep') {
      setCurrentItemIndex((currentItemIndex) => (
        Math.min(currentItemIndex, items.length - 1)
      ))
    }
  }, [items, listChangeBehavior])

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

  const setCurrentItem = useCallback((item: Nullable<T>) => {
    const itemIndex = R.findIndex(
      R.equals(item),
      items
    )

    setCurrentItemIndex(itemIndex)
  }, [items])

  return {
    isEmpty,
    isInitial: isInitial(currentItemIndex),
    currentItem,
    currentItemIndex: R.isNil(currentItemIndex) ? null : currentItemIndex,
    goToNextItem,
    goToPrevItem,
    goToFirstItem,
    goToLastItem,
    setCurrentItem,
    setCurrentItemIndex,
  }
}

export default useItemListNavigation
