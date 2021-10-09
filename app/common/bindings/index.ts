export interface Binding {
  keys: string[]
  isRepeatable: boolean
}

export const make = (
  keys: string[],
  { isRepeatable = false }: { isRepeatable?: boolean } = { }
): Binding => ({ keys, isRepeatable })

export const ID = 'COMMON'

export enum CommonBindingName {
  NEXT_ITEM = 'COMMON_NEXT_ITEM',
  PREV_ITEM = 'COMMON_PREV_ITEM',
  FIRST_ITEM = 'COMMON_FIRST_ITEM',
  LAST_ITEM = 'COMMON_LAST_ITEM',
  NEXT_VIEW = 'COMMON_NEXT_VIEW',
  PREV_VIEW = 'COMMON_PREV_VIEW',
  NAVIGATE_LEFT = 'COMMON_NAVIGATE_LEFT',
  NAVIGATE_RIGHT = 'COMMON_NAVIGATE_RIGHT',
  ADD = 'COMMON_ADD',
  PLAY = 'COMMON_PLAY',
  SEARCH_FOCUS = 'COMMON_SEARCH_FOCUS',
  SEARCH_CANCEL = 'COMMON_SEARCH_CANCEL'
}

export default {
  [CommonBindingName.NEXT_ITEM]: make(['j', 'Down'], { isRepeatable: true }),
  [CommonBindingName.PREV_ITEM]: make(['k', 'Up'], { isRepeatable: true }),
  [CommonBindingName.FIRST_ITEM]: make(['g', 'Home']),
  [CommonBindingName.LAST_ITEM]: make(['G', 'End']),
  [CommonBindingName.NEXT_VIEW]: make(['J', 'Shift+Down'], { isRepeatable: true }),
  [CommonBindingName.PREV_VIEW]: make(['K', 'Shift+Up'], { isRepeatable: true }),
  [CommonBindingName.NAVIGATE_LEFT]: make(['h', 'Left']),
  [CommonBindingName.NAVIGATE_RIGHT]: make(['l', 'Right', 'Enter']),
  [CommonBindingName.ADD]: make(['a']),
  [CommonBindingName.PLAY]: make(['p']),
  [CommonBindingName.SEARCH_FOCUS]: make(['/']),
  [CommonBindingName.SEARCH_CANCEL]: make(['Escape'])
} as Record<CommonBindingName, Binding>
