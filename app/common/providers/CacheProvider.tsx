import React, { useRef, useMemo } from 'react'

import CacheContext, { Cache } from '@app/common/contexts/CacheContext'

const CacheProvider = ({ children }: { children: React.ReactNode }) => {
  const cacheRef = useRef<Record<string, unknown>>({})

  const value: Cache = useMemo(() => ({
    get: (id: string) => (
      cacheRef.current[id]
    ),
    set: (id, value) => {
      cacheRef.current[id] = value
    },
  }), [])

  return (
    <CacheContext.Provider value={value}>
      {children}
    </CacheContext.Provider>
  )
}

export default CacheProvider
