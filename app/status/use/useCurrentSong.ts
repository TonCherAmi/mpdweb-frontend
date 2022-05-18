import * as R from 'ramda'

import QueueItem from '@app/queue/data/QueueItem'

import useQueueContext from '@app/queue/use/useQueueContext'
import useStatusContext from '@app/status/use/useStatusContext'

const useCurrentSong = (): Nullable<QueueItem> => {
  const queue = useQueueContext()
  const status = useStatusContext()

  if (R.isNil(status.song)) {
    return null
  }

  return queue[status.song.position]
}

export default useCurrentSong
