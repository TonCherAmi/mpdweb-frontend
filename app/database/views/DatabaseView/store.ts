import { action, autorun, observable } from 'mobx'

import * as R from 'ramda'

import DatabaseDirectoryStore from '@app/database/stores/DatabaseDirectoryStore'

import { subpaths, DATABASE_ROOT_URI } from './utils'

class DatabaseViewStore {
  private cache: Map<string, DatabaseDirectoryStore> = new Map()

  @observable
  paths: string[] = []

  @observable.shallow
  directoryStores: DatabaseDirectoryStore[] = []

  disposer = autorun(
    async () => {
      this.directoryStores = await Promise.all(
        this.paths.map(this.getPreloadedDirectoryStore)
      )
    }
  )

  @action
  reset(path: string) {
    this.paths = [DATABASE_ROOT_URI, ...subpaths(path)]
  }

  private getPreloadedDirectoryStore = async (path: string): Promise<DatabaseDirectoryStore> => {
    let store = this.cache.get(path)

    if (!R.isNil(store)) {
      return store
    }

    store = new DatabaseDirectoryStore(path)

    this.cache.set(path, store)

    await store.load()

    return store
  }
}

export default new DatabaseViewStore()
