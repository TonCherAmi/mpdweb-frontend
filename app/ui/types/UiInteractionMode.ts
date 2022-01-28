import Thunk from '@app/common/types/Thunk'

interface UiInteractionMode {
  isMouse: boolean
  isKeyboard: boolean
  setMouse: Thunk
  setKeyboard: Thunk
}

export default UiInteractionMode
