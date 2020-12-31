import { action, observable } from 'mobx'

import Status from '@app/status/dto/Status'
import State from '@app/status/dto/enums/State'

import StatusApi from '@app/status/api'

class StatusStore {
  @observable
  value: Status = null

  get isPaused() {
    return this?.value.state === State.PAUSED
  }

  get isPlaying() {
    return this?.value.state === State.PLAYING
  }

  get isStopped() {
    return this?.value.state === State.STOPPED
  }

  async retrieve() {
    this.value = await StatusApi.get()
  }

  @action
  set(status: Status) {
    this.value = status
  }
}

export default new StatusStore()
