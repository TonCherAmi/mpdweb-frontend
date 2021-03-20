import PlaylistApi from '@app/playlist/api'

class PlaylistService {
  async add(uri: string) {
    await PlaylistApi.add({ uri })
  }

  async clear() {
    await PlaylistApi.clear()
  }
}

export default new PlaylistService()
