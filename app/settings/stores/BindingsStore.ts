import { computed, observable } from 'mobx'

import CommonBindings, { Binding, ID as COMMON_ID } from '@app/common/bindings'
import DatabaseViewBindings, { ID as DATABASE_VIEW_ID } from '@app/database/views/DatabaseView/bindings'

class BindingsStore {
  @observable
  bindings: Record<string, Record<string, Binding>> = {
    [COMMON_ID]: CommonBindings,
    [DATABASE_VIEW_ID]: DatabaseViewBindings
  }

  @computed
  get common() {
    return this.bindings[COMMON_ID]
  }
}

export default new BindingsStore()
