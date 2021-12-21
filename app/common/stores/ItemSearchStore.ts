import { action, computed, observable } from 'mobx'

import Fuse from 'fuse.js'

import * as R from 'ramda'

import { normalize } from '@app/common/utils/string'

class ItemSearchStore<T> {
  private fuse: Fuse<T>

  private allItems: T[]

  @observable
  input = ''

  constructor({
    items,
    path,
    transform = R.identity
  }: { items: T[], path: string[], transform: (x: string) => string }) {
    this.allItems = items

    const getFn = R.pipe(
      R.path(path) as (item: T) => string,
      transform,
      normalize
    )

    this.fuse = new Fuse(items, {
      getFn,
      keys: [path]
    })
  }

  @computed
  get items(): T[] {
    if (!R.isEmpty(this.input)) {
      return this.filter()
    }

    return this.allItems
  }

  @action
  search(value: string) {
    this.input = value
  }

  @action
  reset(items: T[]) {
    this.allItems = items

    this.input = ''

    this.fuse.setCollection(items)
  }

  private filter(): T[] {
    return this.fuse.search(this.input)
      .map(
        R.prop('item')
      )
  }
}

export default ItemSearchStore
