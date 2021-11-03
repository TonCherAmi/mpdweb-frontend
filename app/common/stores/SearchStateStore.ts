import { action, computed, observable } from 'mobx'

import SearchState from '@app/common/dto/enums/SearchState'

class SearchStateStore {
  @observable
  private state = SearchState.INACTIVE

  @computed
  get isFocused(): boolean {
    return this.state === SearchState.FOCUSED
  }

  @computed
  get isActive(): boolean {
    return this.state === SearchState.ACTIVE
  }

  @computed
  get isInactive(): boolean {
    return this.state === SearchState.INACTIVE
  }

  @action
  focus() {
    this.state = SearchState.FOCUSED
  }

  @action
  activate() {
    this.state = SearchState.ACTIVE
  }

  @action
  deactivate() {
    this.state = SearchState.INACTIVE
  }
}

export default SearchStateStore
