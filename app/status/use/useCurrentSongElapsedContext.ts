import { ContextType, useContext } from 'react'

import CurrentSongElapsedContext from '@app/status/contexts/CurrentSongElapsedContext'

const useCurrentSongElapsedContext = (): ContextType<typeof CurrentSongElapsedContext> => {
  return useContext(CurrentSongElapsedContext)
}

export default useCurrentSongElapsedContext
