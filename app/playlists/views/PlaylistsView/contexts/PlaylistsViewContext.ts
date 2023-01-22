import { createContext } from 'react'

import Playlist from '@app/playlists/data/Playlist'
import DatabaseFile from '@app/database/data/DatabaseFile'

const PlaylistsViewContext = createContext<{
  playlists: ReadonlyArray<Playlist>
  selection: Nullable<{
    playlist: Playlist
    songs: ReadonlyArray<DatabaseFile>
  }>
}>({ playlists: [], selection: null })

export default PlaylistsViewContext
