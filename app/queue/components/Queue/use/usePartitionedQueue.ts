import { useMemo } from 'react'

import * as R from 'ramda'

import QueueItem from '@app/queue/data/QueueItem'

import useQueueContext from '@app/queue/use/useQueueContext'
import useStatusContext from '@app/status/use/useStatusContext'

interface PartitionedQueue {
  prev: ReadonlyArray<QueueItem>
  next: ReadonlyArray<QueueItem>
}

const usePartitionedQueue = (): PartitionedQueue => {
  const queue = useQueueContext()
  const status = useStatusContext()

  return useMemo(() => {
    const queueWithoutCurrentSong = R.reject(
      R.propEq('position', status.song?.position),
      queue
    )

    const [prev, next] = R.partition((item) => {
      return item.position < (status.song?.position ?? -1)
    }, queueWithoutCurrentSong)

    return { prev, next }
  }, [queue, status.song?.position])

}

export default usePartitionedQueue
