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
  NAVIGATE_RIGHT = 'COMMON_NAVIGATE_RIGHT'
}

export default {
  [CommonBindingName.NEXT_ITEM]: make(['j'], { isRepeatable: true }),
  [CommonBindingName.PREV_ITEM]: make(['k'], { isRepeatable: true }),
  [CommonBindingName.FIRST_ITEM]: make(['g']),
  [CommonBindingName.LAST_ITEM]: make(['Shift+g']),
  [CommonBindingName.NEXT_VIEW]: make(['J'], { isRepeatable: true }),
  [CommonBindingName.PREV_VIEW]: make(['K'], { isRepeatable: true }),
  [CommonBindingName.NAVIGATE_LEFT]: make(['h']),
  [CommonBindingName.NAVIGATE_RIGHT]: make(['l', 'Enter']),
} as Record<CommonBindingName, Binding>
