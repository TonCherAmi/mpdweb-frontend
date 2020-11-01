import { action, observable } from 'mobx'

import PlaylistItem from '@app/playlist/dto/PlaylistItem'

import PlaylistApi from '@app/playlist/api'

class PlaylistStore {
  @observable
  items: PlaylistItem[] = []

  @action
  async retrieve() {
    this.items = await PlaylistApi.get()
  }
}

export default new PlaylistStore()
