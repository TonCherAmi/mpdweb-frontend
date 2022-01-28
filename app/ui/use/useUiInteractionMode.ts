import { useState, useMemo, useCallback } from 'react'

import UiInteractionMode from '@app/ui/types/UiInteractionMode'

const useUiInteractionMode = (): UiInteractionMode => {
  const [mode, setMode] = useState<'mouse' | 'keyboard'>('mouse')

  const setMouse = useCallback(() => {
    setMode('mouse')
  }, [])

  const setKeyboard = useCallback(() => {
    setMode('keyboard')
  }, [])

  return useMemo(() => ({
    isMouse: mode === 'mouse',
    isKeyboard: mode === 'keyboard',
    setMouse: setMouse,
    setKeyboard: setKeyboard
  }), [mode, setKeyboard, setMouse])
}

export default useUiInteractionMode
