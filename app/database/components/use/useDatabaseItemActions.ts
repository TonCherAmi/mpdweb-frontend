import { useMemo } from 'react'

import DatabaseItem from '@app/database/data/DatabaseItem'

import QueueService from '@app/queue/services/QueueService'
import playbackService from '@app/playback/services/PlaybackService'

interface Actions {
  add: (item: DatabaseItem) => void
  replace: (item: DatabaseItem) => void
}

const useDatabaseItemActions = (): Actions => {
  return useMemo(() => {
    const add = async (databaseItem: DatabaseItem) => {
      await QueueService.add(databaseItem.uri)
    }

    const replace = async (databaseItem: DatabaseItem) => {
      await QueueService.replace(databaseItem.uri)
    }

    return { add, replace }
  }, [])
}

export default useDatabaseItemActions
