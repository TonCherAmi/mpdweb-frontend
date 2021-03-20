import { action, observable } from 'mobx'

import Status from '@app/status/dto/Status'
import State from '@app/status/dto/enums/State'

import StatusApi from '@app/status/api'

class StatusStore {
  @observable
  status: Nullable<Status> = null

  get isPaused(): boolean {
    return this?.status?.state === State.PAUSED
  }

  get isPlaying(): boolean {
    return this?.status?.state === State.PLAYING
  }

  get isStopped(): boolean {
    return this?.status?.state === State.STOPPED
  }

  async retrieve() {
    this.status = await StatusApi.get()
  }

  @action
  set(status: Status) {
    this.status = status
  }
}

export default new StatusStore()
