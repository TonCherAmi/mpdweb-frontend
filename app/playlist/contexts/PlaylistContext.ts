import { createContext } from 'react'

import PlaylistItem from '@app/playlist/dto/PlaylistItem'

const PlaylistContext = createContext<ReadonlyArray<PlaylistItem>>([])

export default PlaylistContext
