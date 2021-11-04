import { computed, observable } from 'mobx'

import CommonBindings, { Binding, ID as COMMON_ID } from '@app/common/bindings'
import SidebarBindings, { ID as SIDEBAR_ID } from '@app/layout/components/Sidebar/bindings'

class BindingsStore {
  @observable
  bindings: Record<string, Record<string, Binding>> = {
    [COMMON_ID]: CommonBindings,
    [SIDEBAR_ID]: SidebarBindings
  }

  @computed
  get common() {
    return this.bindings[COMMON_ID]
  }
}

export default new BindingsStore()
