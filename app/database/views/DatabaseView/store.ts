import { action, computed, observable } from 'mobx'

import * as R from 'ramda'

import SearchState from '@app/common/dto/enums/SearchState'

import DatabaseItem from '@app/database/dto/DatabaseItem'
import DatabaseCount from '@app/database/dto/DatabaseCount'

import { basename } from '@app/common/utils/path'

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
  get mainItems() {
    if (this.search.state === SearchState.HIDDEN) {
      return this.main.items
    }

    const pred = (item: DatabaseItem): boolean => {
      const base = basename(item.uri).toLowerCase()

      return base.includes(
        this.search.value.toLowerCase()
      )
    }

    return R.filter(pred, this.main.items)
  }

  @action
  async retrieveMain(uri: string = this.main.uri) {
    this.main.uri = uri
    this.main.items = await DatabaseApi.get({ uri })
  }

  @action
  async retrievePreview(item: DatabaseItem) {
    const { uri } = item

    this.preview.item = item
    this.preview.items = await DatabaseApi.get({ uri })
    this.preview.count = await DatabaseApi.count({ uri })
  }

  @action
  resetSearch() {
    this.search.value = ''
    this.search.state = SearchState.HIDDEN
  }

  @action
  resetPreview() {
    this.preview.item = null
    this.preview.items = []
    this.preview.count = null
  }

  @action
  setSearch(value: string) {
    this.search.value = value
  }
}

export default new DatabaseViewStore()
