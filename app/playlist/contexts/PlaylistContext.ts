import { createContext } from 'react'

import PlaylistItem from '@app/playlist/data/PlaylistItem'

const PlaylistContext = createContext<ReadonlyArray<PlaylistItem>>([])

export default PlaylistContext
