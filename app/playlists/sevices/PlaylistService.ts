import PlaylistApi from '@app/playlists/api'

class PlaylistService {
  delete(name: string) {
    PlaylistApi.delete({ name })
  }

  deleteFiles(name: string, positions: ReadonlyArray<number>) {
    PlaylistApi.files.delete({ name, positions })
  }
}

export default new PlaylistService()
