import { useContext, ContextType } from 'react'

import PlaylistsViewContext from '@app/playlists/views/PlaylistsView/contexts/PlaylistsViewContext'

const usePlaylistsViewContext = (): ContextType<typeof PlaylistsViewContext> => {
  return useContext(PlaylistsViewContext)
}

export default usePlaylistsViewContext
