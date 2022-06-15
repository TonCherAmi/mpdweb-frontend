import { ContextType, useContext } from 'react'

import CacheContext from '@app/common/contexts/CacheContext'

const useCacheContext = (): ContextType<typeof CacheContext> => {
  return useContext(CacheContext)
}

export default useCacheContext
