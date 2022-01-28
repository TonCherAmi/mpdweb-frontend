import React from 'react'

import useUiInteractionMode from '@app/ui/use/useUiInteractionMode'

import UiInteractionModeContext from '@app/ui/contexts/UiInteractionModeContext'

const UiInteractionModeProvider = ({ children }: { children: React.ReactNode }) => {
  const uiInteractionMode = useUiInteractionMode()

  return (
    <UiInteractionModeContext.Provider value={uiInteractionMode}>
      {children}
    </UiInteractionModeContext.Provider>
  )
}

export default UiInteractionModeProvider
