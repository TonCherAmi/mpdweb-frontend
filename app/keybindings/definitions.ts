import { KeybindingTrigger } from '@app/keybindings/managers/KeybindingsManager'

export interface Keybinding {
  triggers: ReadonlyArray<KeybindingTrigger>
  isRepeatable: boolean
}

const make = (
  triggers: ReadonlyArray<KeybindingTrigger>,
  { isRepeatable = false }: { isRepeatable?: boolean } = {}
): Keybinding => ({ triggers, isRepeatable })

export default {
  NEXT_ITEM: make(['j', 'ArrowDown'], { isRepeatable: true }),
  PREV_ITEM: make(['k', 'ArrowUp'], { isRepeatable: true }),
  FIRST_ITEM: make(['g', 'Home']),
  LAST_ITEM: make(['End', { key: 'g', mods: ['shift'] }]),
  NAVIGATE_LEFT: make(['h', 'ArrowLeft']),
  NAVIGATE_RIGHT: make(['l', 'ArrowRight', 'Enter']),
  ADD: make(['a']),
  PLAY: make(['p']),
  SEARCH_FOCUS: make(['/']),
  SEARCH_CANCEL: make(['Escape']),
  MODAL_CLOSE: make(['Escape']),
  CONTEXT_MENU_CLOSE: make(['Escape']),
  NEXT_VIEW: make(
    [
      { key: 'j', mods: ['shift'] },
      { key: 'ArrowDown', mods: ['alt'] }
    ],
    { isRepeatable: true }
  ),
  PREV_VIEW: make(
    [
      { key: 'k', mods: ['shift'] },
      { key: 'ArrowUp', mods: ['alt'] }
    ],
    { isRepeatable: true }
  ),
  DATABASE_SEARCH_MODAL: make([{ key: 's', mods: ['shift'] }])
}
