import { useContext, ContextType } from 'react'

import UiInteractionModeContext from '@app/ui/contexts/UiInteractionModeContext'

const useUiInteractionModeContext = (): ContextType<typeof UiInteractionModeContext> => {
  return useContext(UiInteractionModeContext)
}

export default useUiInteractionModeContext
