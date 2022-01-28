import React from 'react'

import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'

const useUiInteractionModeAwareMouseEventHandler = (): React.MouseEventHandler | undefined => {
  const uiInteractionMode = useUiInteractionModeContext()

  if (uiInteractionMode.isMouse) {
    return undefined
  }

  return (mouseEvent) => {
    if (mouseEvent.movementX !== 0 || mouseEvent.movementY !== 0) {
      uiInteractionMode.setMouse()
    }
  }
}

export default useUiInteractionModeAwareMouseEventHandler
