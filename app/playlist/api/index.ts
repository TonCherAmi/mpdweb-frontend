import { make, HttpMethod } from '@app/common/api'

import PlaylistItem from '@app/playlist/dto/PlaylistItem'
import PlaylistAddBody from '@app/playlist/dto/api/request/PlaylistAddBody'

const Api = {
  get: make<PlaylistItem[]>('/playlist'),
  add: make<null, PlaylistAddBody>('/playlist/add', HttpMethod.POST),
  clear: make<null>('/playlist/clear', HttpMethod.POST)
}

export default Api
