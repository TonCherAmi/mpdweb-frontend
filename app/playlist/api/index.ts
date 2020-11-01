import { make, HttpMethod } from '@app/common/api'

import PlaylistItem from '@app/playlist/dto/PlaylistItem'

const Api = {
  get: make<PlaylistItem[]>('/playlist'),
  clear: make<null>('/playlist/clear', HttpMethod.POST)
}

export default Api
