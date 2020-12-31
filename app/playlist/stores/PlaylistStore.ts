import { action, observable } from 'mobx'

import PlaylistItem from '@app/playlist/dto/PlaylistItem'

import PlaylistApi from '@app/playlist/api'

class PlaylistStore {
  @observable
  items: PlaylistItem[] = []

  @action
  async add(uri: string) {
    await PlaylistApi.add({ uri })
  }

  @action
  async clear() {
    await PlaylistApi.clear()
  }

  @action
  async retrieve() {
    this.items = await PlaylistApi.get()
  }
}

export default new PlaylistStore()
