import { createContext } from 'react'

export const INITIAL_PLAYLISTS_VERSION = 0

const PlaylistsVersionContext = createContext<number>(INITIAL_PLAYLISTS_VERSION)

export default PlaylistsVersionContext
