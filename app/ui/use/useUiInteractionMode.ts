import { useState, useMemo, useCallback } from 'react'

import UiInteractionMode from '@app/ui/types/UiInteractionMode'

const useUiInteractionMode = (): UiInteractionMode => {
  const [value, setValue] = useState<'mouse' | 'keyboard'>('mouse')

  const setMouse = useCallback(() => {
    setValue('mouse')
  }, [])

  const setKeyboard = useCallback(() => {
    setValue('keyboard')
  }, [])

  return useMemo(() => ({
    isMouse: value === 'mouse',
    isKeyboard: value === 'keyboard',
    value,
    setMouse: setMouse,
    setKeyboard: setKeyboard,
  }), [value, setKeyboard, setMouse])
}

export default useUiInteractionMode
