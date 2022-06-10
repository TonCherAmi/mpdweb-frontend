import { createContext } from 'react'

import Handler from '@app/common/types/Handler'

export type Mod = 'ctrl' | 'shift' | 'alt' | 'meta'

export type SimpleKeybindingTrigger = string | { key: string, mods: ReadonlyArray<Mod> }
export type CompoundKeybindingTrigger = { sequence: ReadonlyArray<SimpleKeybindingTrigger> }

export type KeybindingTrigger = SimpleKeybindingTrigger | CompoundKeybindingTrigger

export type KeybindingHandler = Handler<KeyboardEvent>

export interface Keybinding {
  isRepeatable: boolean
  triggers: ReadonlyArray<KeybindingTrigger>
}

const noop = () => {
  throw Error('KeybindingsContext provider required')
}

const KeybindingsContext = createContext<{
  add: (keybinding: Keybinding, handler: KeybindingHandler) => void
  remove: (keybinding: Keybinding) => void
}>({ add: noop, remove: noop })

export default KeybindingsContext
