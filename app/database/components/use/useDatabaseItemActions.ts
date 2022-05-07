import { useMemo } from 'react'

import DatabaseItem from '@app/database/dto/DatabaseItem'

import playlistService from '@app/playlist/services/PlaylistService'
import playbackService from '@app/playback/services/PlaybackService'

interface Actions {
  add: (item: DatabaseItem) => void
  replace: (item: DatabaseItem) => void
}

const useDatabaseItemActions = (): Actions => {
  return useMemo(() => {
    const add = async (databaseItem: DatabaseItem) => {
      await playlistService.add(databaseItem.uri)
    }

    const replace = async (databaseItem: DatabaseItem) => {
      await playlistService.replace(databaseItem.uri)
    }

    return { add, replace }
  }, [])
}

export default useDatabaseItemActions
