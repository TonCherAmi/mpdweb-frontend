import { createContext } from 'react'

import UiInteractionMode from '@app/ui/types/UiInteractionMode'

const noop = () => {
  throw Error('UiInteractionModeContext provider required')
}

const defaultValue: UiInteractionMode = {
  isMouse: true,
  isKeyboard: false,
  setMouse: noop,
  setKeyboard: noop
}

const UiInteractionModeContext = createContext<UiInteractionMode>(defaultValue)

export default UiInteractionModeContext
