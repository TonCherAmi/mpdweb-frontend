import { useContext } from 'react'

import QueueItem from '@app/queue/data/QueueItem'

import QueueContext from '@app/queue/contexts/QueueContext'

const useQueueContext = (): ReadonlyArray<QueueItem> => {
  const queue = useContext(QueueContext)

  if (queue?.status !== 'ok') {
    return []
  }

  return queue.data
}

export default useQueueContext
