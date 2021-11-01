import { action, computed, observable } from 'mobx'

import Fuse from 'fuse.js'

import * as R from 'ramda'

import { normalize } from '@app/common/utils/string'

class SearchStore<T> {
  private fuse: Fuse<T>

  private allItems: T[]

  @observable
  input: {
    value: string
  } = { value: '' }

  constructor(items: T[], path: string[], transform: (x: string) => string = R.identity) {
    const getFn = R.pipe(R.path(path), transform, normalize)

    this.allItems = items

    this.fuse = new Fuse(items, {
      getFn,
      keys: [path]
    })
  }

  @computed
  get items(): T[] {
    if (R.isEmpty(this.input.value)) {
      return this.allItems
    }

    return this.filter()
  }

  @action
  search(value: string) {
    this.input.value = value
  }

  @action
  reset(items: T[]) {
    this.allItems = items

    this.input.value = ''

    this.fuse.setCollection(items)
  }

  private filter(): T[] {
    return this.fuse.search(this.input.value).map(R.prop('item'))
  }
}

export default SearchStore
