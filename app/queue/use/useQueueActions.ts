import { useMemo } from 'react'

import Playlist from '@app/playlists/data/Playlist'
import DatabaseItem from '@app/database/data/DatabaseItem'

import QueueService from '@app/queue/services/QueueService'

interface Actions {
  add: (source: Playlist | DatabaseItem) => void
  replace: (source: Playlist | DatabaseItem) => void
}

const useQueueActions = (): Actions => {
  return useMemo(() => {
    const add = async (source: Playlist | DatabaseItem) => {
      await QueueService.add(source)
    }

    const replace = async (source: Playlist | DatabaseItem) => {
      await QueueService.replace(source)
    }

    return { add, replace }
  }, [])
}

export default useQueueActions
