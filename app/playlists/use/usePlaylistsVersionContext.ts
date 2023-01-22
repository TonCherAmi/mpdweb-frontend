import { useContext, ContextType } from 'react'

import PlaylistsVersionContext from '@app/playlists/contexts/PlaylistsVersionContext'

const usePlaylistsVersionContext = (): ContextType<typeof PlaylistsVersionContext> => {
  return useContext(PlaylistsVersionContext)
}

export default usePlaylistsVersionContext
