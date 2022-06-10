import React, { useRef, useReducer, useMemo, Dispatch } from 'react'

import * as R from 'ramda'

import FocusScopeContext, { FocusScope } from '@app/ui/contexts/FocusScopeContext'

const FocusScopeProvider = ({ children }: { children: React.ReactNode }) => {
  const scopeHistoryRef = useRef<Array<FocusScope>>([])

  const [currentScope, toggleCurrentScope] = useReducer((currentScope: FocusScope, newScope: FocusScope) => {
    if (newScope !== currentScope) {
      scopeHistoryRef.current.push(currentScope)

      return newScope
    }

    const previousScope = scopeHistoryRef.current.pop()

    if (R.isNil(previousScope)) {
      return newScope
    }

    return previousScope
  }, 'view')

  const value: [FocusScope, Dispatch<FocusScope>] = useMemo(() => [
    currentScope,
    toggleCurrentScope
  ], [currentScope, toggleCurrentScope])

  return (
    <FocusScopeContext.Provider value={value}>
      {children}
    </FocusScopeContext.Provider>
  )
}

export default FocusScopeProvider
