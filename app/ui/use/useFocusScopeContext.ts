import { useContext, ContextType } from 'react'

import FocusScopeContext from '@app/ui/contexts/FocusScopeContext'

const useFocusScopeContext = (): ContextType<typeof FocusScopeContext> => {
  return useContext(FocusScopeContext)
}

export default useFocusScopeContext
