import { action, computed, observable } from 'mobx'

import SearchState from '@app/common/dto/enums/SearchState'

import DatabaseItem from '@app/database/dto/DatabaseItem'
import DatabaseCount from '@app/database/dto/DatabaseCount'

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

  @observable
  search: {
    value: string
    state: SearchState
  } = { value: '', state: SearchState.HIDDEN }

  @computed
  get items() {
    return this.main.items
  }

  @action
  async retrieve(uri: string = this.main.uri) {
    this.main.uri = uri
    this.main.items = await DatabaseApi.get({ uri })
  }

  @action
  resetSearch() {
    this.search.state = SearchState.HIDDEN
  }
}

export default new DatabaseViewStore()
