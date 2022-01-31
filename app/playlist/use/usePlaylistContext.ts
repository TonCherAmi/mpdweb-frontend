import { useContext, ContextType } from 'react'

import PlaylistContext from '@app/playlist/contexts/PlaylistContext'

const usePlaylistContext = (): ContextType<typeof PlaylistContext> => {
  return useContext(PlaylistContext)
}

export default usePlaylistContext
