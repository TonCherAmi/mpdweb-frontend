import PlaybackApi from '@app/playback/api'

class PlaybackService {
  async toggle() {
    await PlaybackApi.toggle()
  }

  async stop() {
    await PlaybackApi.stop()
  }

  async prev() {
    await PlaybackApi.prev()
  }

  async next() {
    await PlaybackApi.next()
  }
}

export default new PlaybackService()
