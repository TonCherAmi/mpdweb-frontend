import PlaybackApi from '@app/playback/api'

class PlaybackService {
  async play(id: Nullable<number> = null) {
    await PlaybackApi.play({ id })
  }

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

  async seek(time: number) {
    await PlaybackApi.seek({ time, mode: 'ABSOLUTE' })
  }
}

export default new PlaybackService()
