import { KeybindingTrigger } from '@app/keybindings/contexts/KeybindingsContext'

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
  FIRST_ITEM: make([
    'Home',
    { sequence: ['g', 'g'] },
  ]),
  LAST_ITEM: make(['End', { key: 'g', mods: ['shift'] }]),
  NAVIGATE_LEFT: make(['h', 'ArrowLeft']),
  NAVIGATE_RIGHT: make(['l', 'ArrowRight', 'Enter']),
  ADD: make(['a']),
  PLAY: make(['p']),
  SEARCH_FOCUS: make(['/']),
  SEARCH_CANCEL: make(['Escape']),
  MODAL_CLOSE: make(['Escape']),
  CONTEXT_MENU_CLOSE: make(['Escape']),
  NEXT_VIEW: make([
    { key: 'j', mods: ['shift'] },
    { key: 'ArrowDown', mods: ['alt'] },
  ], { isRepeatable: true }),
  PREV_VIEW: make([
    { key: 'k', mods: ['shift'] },
    { key: 'ArrowUp', mods: ['alt'] },
  ], { isRepeatable: true }),
  PLAYBACK_STOP: make([{ key: 's', mods: ['shift'] }]),
  PLAYBACK_TOGGLE: make([' ']),
  PLAYBACK_NEXT: make([{ key: 'n', mods: ['shift'] }]),
  PLAYBACK_PREV: make([{ key: 'p', mods: ['shift'] }]),
  VOLUME_UP: make([{ key: '+', mods: ['shift'] }], { isRepeatable: true }),
  VOLUME_DOWN: make(['-'], { isRepeatable: true }),
  DATABASE_UPDATE: make([{ key: 'u', mods: ['shift'] }]),
  DATABASE_SEARCH_MODAL: make(['s']),
  QUEUE_CLEAR: make([
    { sequence: [{ key: 'q', mods: ['shift'] }, 'c'] },
  ]),
  QUEUE_TOGGLE: make(['q']),
}
