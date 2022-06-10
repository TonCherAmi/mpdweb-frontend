import { createContext, Dispatch } from 'react'

const noop = () => {
  throw Error('FocusScopeContext provider required')
}

export type FocusScope = 'view' | 'queue' | 'modal' | 'contextmenu'

const FocusScopeContext = createContext<[
  FocusScope,
  Dispatch<FocusScope>
]>(['view', noop])

export default FocusScopeContext
