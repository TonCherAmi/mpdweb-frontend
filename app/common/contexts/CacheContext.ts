import { createContext } from 'react'

export interface Cache {
  get: (id: string) => unknown,
  set: (id: string, value: unknown) => void
}

const noop = () => {
  throw Error('CacheContext provider required')
}

const CacheContext = createContext<Cache>({ get: noop, set: noop })

export default CacheContext
