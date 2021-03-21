import { action, observable, computed } from 'mobx'

import * as R from 'ramda'

import DatabaseItem from '@app/database/dto/DatabaseItem'
import DatabaseCount from '@app/database/dto/DatabaseCount'

import DatabaseApi from '@app/database/api'

class DatabasePreviewStore {
  @observable
  item: Nullable<DatabaseItem>

  @observable
  count: Nullable<DatabaseCount>

  @observable
  children: DatabaseItem[] = []

  @computed
  get isEmpty(): boolean {
    return R.isNil(this.item)
  }

  @action
  reset() {
    this.item = null
    this.count = null
    this.children = []
  }

  @action
  async retrieve(item: DatabaseItem) {
    const { uri } = item

    this.item = item

    this.count = await DatabaseApi.count({ uri })
    this.children = await DatabaseApi.get({ uri })
  }
}

export default DatabasePreviewStore
