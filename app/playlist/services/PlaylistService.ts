import PlaylistApi from '@app/playlist/api'

class PlaylistService {
  add(uri: string) {
    PlaylistApi.add({ uri })
  }

  clear() {
    PlaylistApi.delete({ id: null })
  }

  delete(id: number) {
    PlaylistApi.delete({ id })
  }

  replace(uri: string) {
    PlaylistApi.replace({ uri })
  }
}

export default new PlaylistService()
