import { action, observable } from 'mobx'

import Status from '@app/status/dto/Status'

import StatusApi from '@app/status/api'

class StatusStore {
  @observable
  value: Status = null

  async retrieve() {
    this.value = await StatusApi.get()
  }

  @action
  set(status: Status) {
    this.value = status
  }
}

export default new StatusStore()
