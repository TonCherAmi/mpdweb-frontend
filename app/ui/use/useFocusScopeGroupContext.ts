import { useContext } from 'react'

import * as R from 'ramda'

import { FocusScope } from '@app/ui/contexts/FocusScopeContext'

import FocusScopeGroupContext from '@app/ui/contexts/FocusScopeGroupContext'

const useFocusScopeGroupContext = (): FocusScope => {
  const focusScopeGroup = useContext(FocusScopeGroupContext)

  if (R.isNil(focusScopeGroup)) {
    throw Error('focus scope group not set')
  }

  return focusScopeGroup
}

export default useFocusScopeGroupContext
