import Thunk from '@app/common/types/Thunk'

interface UiInteractionMode {
  isMouse: boolean
  isKeyboard: boolean
  value: 'mouse' | 'keyboard'
  setMouse: Thunk
  setKeyboard: Thunk
}

export default UiInteractionMode
