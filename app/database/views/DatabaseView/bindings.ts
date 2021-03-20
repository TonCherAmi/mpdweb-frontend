import { make, Binding } from '@app/common/bindings'

export const ID = 'DATABASE_VIEW'

export enum DatabaseViewBindingName {
  ADD = 'DATABASE_VIEW_ADD',
  PLAY = 'DATABASE_VIEW_PLAY',
  SEARCH_FOCUS = 'DATABASE_VIEW_SEARCH_FOCUS',
  SEARCH_CANCEL = 'DATABASE_VIEW_SEARCH_CANCEL',
}

export default {
  [DatabaseViewBindingName.ADD]: make(['a']),
  [DatabaseViewBindingName.PLAY]: make(['p']),
  [DatabaseViewBindingName.SEARCH_FOCUS]: make(['/']),
  [DatabaseViewBindingName.SEARCH_CANCEL]: make(['Escape'])
} as Record<DatabaseViewBindingName, Binding>
