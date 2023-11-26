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
  FIRST_ITEM: make([
    'Home',
    { sequence: ['g', 'g'] },
  ]),
  LAST_ITEM: make(['End', { key: 'g', mods: ['shift'] }]),
  ENTER: make(['Enter']),
  NAVIGATE_UP: make(['k', 'ArrowUp'], { isRepeatable: true }),
  NAVIGATE_DOWN: make(['j', 'ArrowDown'], { isRepeatable: true }),
  NAVIGATE_LEFT: make(['h', 'ArrowLeft'], { isRepeatable: true }),
  NAVIGATE_RIGHT: make(['l', 'ArrowRight'], { isRepeatable: true }),
  ADD: make(['a']),
  PLAY: make(['p']),
  GO_TO_DEFINITION: make([{ sequence: ['g', 'i'] }]),
  REMOVE: make([
    'x',
    { sequence: ['d', 'd'] },
  ], { isRepeatable: true }),
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
  PLAYBACK_OPTIONS_SINGLE_TOGGLE: make([
    { sequence: [{ key: 'o', mods: ['shift'] }, 's'] },
  ]),
  PLAYBACK_OPTIONS_RANDOM_TOGGLE: make([
    { sequence: [{ key: 'o', mods: ['shift'] }, 'r'] },
  ]),
  PLAYBACK_OPTIONS_REPEAT_TOGGLE: make([
    { sequence: [{ key: 'o', mods: ['shift'] }, 'p'] },
  ]),
  PLAYBACK_OPTIONS_CONSUME_TOGGLE: make([
    { sequence: [{ key: 'o', mods: ['shift'] }, 'c'] },
  ]),
  VOLUME_UP: make([{ key: '+', mods: ['shift'] }], { isRepeatable: true }),
  VOLUME_DOWN: make(['-'], { isRepeatable: true }),
  DATABASE_UPDATE: make([{ key: 'u', mods: ['shift'] }]),
  DATABASE_UPDATE_AT_POINT: make(['u']),
  DATABASE_SEARCH_MODAL: make(['s']),
  DATABASE_CURRENT_COVER_ART_MODAL: make(['c']),
  DATABASE_CURRENT_GO_TO_DEFINITION: make([{ sequence: ['g', { key: 'i', mods: ['shift'] }] }]),
  QUEUE_CLEAR: make([
    { sequence: [{ key: 'q', mods: ['shift'] }, 'c'] },
  ]),
  QUEUE_FOCUS_TOGGLE: make(['q']),
  QUEUE_FOCUSED_PARTITION_TOGGLE: make(['h']),
}
