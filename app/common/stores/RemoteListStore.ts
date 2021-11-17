import * as R from 'ramda'

import RemoteDataStore from '@app/common/stores/RemoteDataStore'

class RemoteListStore<R extends Array<unknown>, T> extends RemoteDataStore<R, T> {
  get items(): R {
    if (R.isNil(this.data)) {
      return [] as unknown as R
    }

    return this.data
  }
}

export default RemoteListStore
