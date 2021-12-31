import { KeybindingHandler } from '@app/keybindings/managers/KeybindingsManager'

import KEYBINDING_DEFINITIONS from '@app/keybindings/definitions'

export type KeybindingHandlers = {
  [name in keyof typeof KEYBINDING_DEFINITIONS]?: KeybindingHandler
}

export const conformHandler = (handler: KeybindingHandler) => (event: KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()

  return handler(event)
}
