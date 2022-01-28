import React from 'react'

import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'

const useUiInteractionModeAwareWheelEventHandler = (): React.WheelEventHandler | undefined => {
  const uiInteractionMode = useUiInteractionModeContext()

  if (uiInteractionMode.isMouse) {
    return undefined
  }

  return uiInteractionMode.setMouse
}

export default useUiInteractionModeAwareWheelEventHandler
