import { computed, observable } from 'mobx'

import * as R from 'ramda'

export enum RemoteDataState {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  CANCELED = 'CANCELED'
}

class RemoteDataStore<R, T> {
  @observable
  state = RemoteDataState.INITIAL

  @observable
  data: Nullable<R> = null

  private readonly fetch: (data: Nullable<T>) => Promise<R>

  constructor(fetch: (data: Nullable<T>) => Promise<R>) {
    this.fetch = fetch
  }

  @computed
  get isLoading() {
    return R.equals(this.state, RemoteDataState.LOADING)
  }

  @computed
  get isInitial() {
    return R.equals(this.state, RemoteDataState.INITIAL)
  }

  cancel: Nullable<() => void> = null

  async load(args: Nullable<T>) {
    try {
      let isCancelled = false

      this.cancel = () => {
        isCancelled = true

        this.data = null

        this.state = RemoteDataState.CANCELED
      }

      this.state = RemoteDataState.LOADING

      const data = await this.fetch(args)

      if (isCancelled) {
        return
      }

      this.data = data

      this.state = RemoteDataState.LOADED
    } catch (e) {
      this.state = RemoteDataState.ERROR
    }
  }
}

export default RemoteDataStore
