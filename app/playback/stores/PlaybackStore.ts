import { action } from 'mobx'

import PlaybackApi from '@app/playback/api'

class PlaybackStore {
  @action
  async toggle() {
    await PlaybackApi.toggle()
  }

  @action
  async stop() {
    await PlaybackApi.stop()
  }

  @action
  async prev() {
    await PlaybackApi.prev()
  }

  @action
  async next() {
    await PlaybackApi.next()
  }
}

export default new PlaybackStore()
