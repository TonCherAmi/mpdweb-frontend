import { make, Binding } from '@app/common/bindings'

export const ID = 'SIDEBAR'

export enum SidebarBindingName {
  NEXT_ITEM = 'NEXT_ITEM',
  PREV_ITEM = 'PREV_ITEM'
}

export default {
  [SidebarBindingName.NEXT_ITEM]: make(['Shift+j', 'Alt+Down'], { isRepeatable: true }),
  [SidebarBindingName.PREV_ITEM]: make(['Shift+k', 'Alt+Up'], { isRepeatable: true })
} as Record<SidebarBindingName, Binding>
