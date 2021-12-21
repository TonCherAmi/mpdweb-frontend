import { action, computed, observable } from 'mobx'

enum UiInteractionMode {
  MOUSE = 'MOUSE',
  KEYBOARD = 'KEYBOARD'
}

class UiStore {
  @observable
  interactionMode: UiInteractionMode = UiInteractionMode.MOUSE

  @computed
  get isMouseInteractionModeOn(): boolean {
    return this.interactionMode === UiInteractionMode.MOUSE
  }

  @computed
  get isKeyboardInteractionModeOn(): boolean {
    return this.interactionMode === UiInteractionMode.KEYBOARD
  }

  @action
  activateMouseInteractionMode() {
    this.interactionMode = UiInteractionMode.MOUSE
  }

  @action
  activateKeyboardInteractionMode() {
    this.interactionMode = UiInteractionMode.KEYBOARD
  }
}

export default new UiStore()
