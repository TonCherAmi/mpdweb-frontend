import { action, computed, observable } from 'mobx'

import DatabaseItem from '@app/database/dto/DatabaseItem'

import DatabaseApi from '@app/database/api'

export const DATABASE_ROOT_URI = '/'

class DatabaseViewStore {
  @observable
  main: {
    uri: string,
    items: DatabaseItem[]
  } = { uri: DATABASE_ROOT_URI, items: [] }

  @observable
  preview: {
    item: Nullable<DatabaseItem>
    items: DatabaseItem[]
    count: Nullable<DatabaseCount>
  } = { item: null, items: [], count: null }

  @computed
  get items() {
    return this.main.items
  }

  @action
  async retrieve(uri: string = this.main.uri) {
    this.main.uri = uri
    this.main.items = await DatabaseApi.get({ uri })
  }
}

export default new DatabaseViewStore()
