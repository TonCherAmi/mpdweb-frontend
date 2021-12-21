import { action } from 'mobx'

import DatabaseItem from '@app/database/dto/DatabaseItem'
import DatabaseGetBody from '@app/database/dto/api/request/DatabaseGetBody'

import DatabaseApi from '@app/database/api'

import RemoteListStore from '@app/common/stores/RemoteListStore'
import ItemSearchStore from '@app/common/stores/ItemSearchStore'
import ItemNavigationStore from '@app/common/stores/ItemNavigationStore'

import { basename } from '@app/common/utils/path'

class DatabaseDirectoryStore extends RemoteListStore<DatabaseItem[], DatabaseGetBody> {
  private readonly path: string

  itemSearchStore: ItemSearchStore<DatabaseItem> = new ItemSearchStore({
    items: [],
    path: ['uri'],
    transform: basename
  })

  itemNavigationStore: ItemNavigationStore = new ItemNavigationStore([])

  constructor(path: string) {
    super(DatabaseApi.get)

    this.path = path
  }

  @action
  async load() {
    await super.load({ uri: this.path })

    this.itemSearchStore.reset(this.items)
    this.itemNavigationStore.reset(this.items)
  }
}

export default DatabaseDirectoryStore
