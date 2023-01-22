import { createContext } from 'react'

export const INITIAL_DATABASE_VERSION = 0

const DatabaseVersionContext = createContext<number>(INITIAL_DATABASE_VERSION)

export default DatabaseVersionContext
