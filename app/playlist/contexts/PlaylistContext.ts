import { createContext } from 'react'

import DatabaseFile from '@app/database/dto/DatabaseFile'

const PlaylistContext = createContext<ReadonlyArray<DatabaseFile>>([])

export default PlaylistContext
