import { createContext, Dispatch } from 'react'

const noop = () => {
  throw Error('FocusScopeContext provider required')
}

export type FocusScope = 'view' | 'queue' | 'modal' | 'contextmenu'

export type FocusScopeAction = { type: 'toggle', scope: FocusScope }

const FocusScopeContext = createContext<[
  FocusScope,
  Dispatch<FocusScopeAction>
]>(['view', noop])

export default FocusScopeContext
