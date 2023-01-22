import { useMemo } from 'react'

import Playlist from '@app/playlists/data/Playlist'

import PlaylistApi from '@app/playlists/api'

interface Actions {
  remove: (playlist: Playlist) => void
  removeSongs: (playlist: Playlist, positions: ReadonlyArray<number>) => void
}

const usePlaylistActions = (): Actions => {
  return useMemo(() => ({
    remove: ({ name }) => PlaylistApi.delete({ name }),
    removeSongs: ({ name }, positions) => (
      PlaylistApi.songs.delete({ name, positions })
    ),
  }), [])
}

export default usePlaylistActions
