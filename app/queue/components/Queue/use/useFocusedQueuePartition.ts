import { useReducer, useEffect } from 'react'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'
import QueueItem from '@app/queue/data/QueueItem'

const useFocusedQueuePartition = (
  prev: ReadonlyArray<QueueItem>,
  next: ReadonlyArray<QueueItem>,
): ['prev' | 'next', Thunk] => {
  const [focusedPartition, toggleFocusedPartition] = useReducer((current: 'prev' | 'next') => (
    current === 'prev' ? 'next' : 'prev'
  ), 'next')

  useEffect(() => {
    if (R.isEmpty(prev) && R.isEmpty(next)) {
      return
    }

    if (R.isEmpty(prev) && focusedPartition === 'prev' || R.isEmpty(next) && focusedPartition === 'next') {
      toggleFocusedPartition()
    }
  }, [focusedPartition, prev, next])

  return [focusedPartition, toggleFocusedPartition]
}

export default useFocusedQueuePartition
