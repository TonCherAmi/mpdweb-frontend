import { useMemo } from 'react'

import DatabaseItem from '@app/database/dto/DatabaseItem'

import playlistService from '@app/playlist/services/PlaylistService'
import playbackService from '@app/playback/services/PlaybackService'

interface Actions {
  add: (item: DatabaseItem) => void
  play: (item: DatabaseItem) => void
}

const useDatabaseItemActions = (): Actions => {
  return useMemo(() => {
    const add = async (databaseItem: DatabaseItem) => {
      await playlistService.add(databaseItem.uri)
    }

    const play = async (databaseItem: DatabaseItem) => {
      await playlistService.clear()
      await playlistService.add(databaseItem.uri)
      await playbackService.toggle()
    }

    return { add, play }
  }, [])
}

export default useDatabaseItemActions
