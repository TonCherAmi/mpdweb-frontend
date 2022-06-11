import React, { useRef, useReducer, useMemo, Dispatch } from 'react'

import * as R from 'ramda'

import FocusScopeContext, {
  FocusScope,
  FocusScopeAction,
} from '@app/ui/contexts/FocusScopeContext'

const FocusScopeProvider = ({ children }: { children: React.ReactNode }) => {
  const scopeHistoryRef = useRef<Array<FocusScope>>([])

  const [currentScope, dispatch] = useReducer((currentScope: FocusScope, action: FocusScopeAction) => {
    switch (action.type) {
      case 'toggle': {
        if (action.scope !== currentScope) {
          scopeHistoryRef.current.push(currentScope)

          return action.scope
        }

        const previousScope = scopeHistoryRef.current.pop()

        if (R.isNil(previousScope)) {
          return action.scope
        }

        return previousScope
      }

      default: {
        throw Error('unknown FocusScopeProvider action')
      }
    }
  }, 'view')

  const value: [FocusScope, Dispatch<FocusScopeAction>] = useMemo(() => [
    currentScope,
    dispatch,
  ], [currentScope, dispatch])

  return (
    <FocusScopeContext.Provider value={value}>
      {children}
    </FocusScopeContext.Provider>
  )
}

export default FocusScopeProvider
