import { observable } from 'mobx'

import KEYMAP from '@app/keybindings/definitions'

class KeybindingsStore {
  @observable
  keybindings = KEYMAP
}

export default new KeybindingsStore()
