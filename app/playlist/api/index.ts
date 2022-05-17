import { make } from '@app/common/api'

import PlaylistItem from '@app/playlist/dto/PlaylistItem'
import PlaylistAddBody from '@app/playlist/dto/api/request/PlaylistAddBody'
import PlaylistDeleteBody from '@app/playlist/dto/api/request/PlaylistDeleteBody'
import PlaylistReplaceBody from '@app/playlist/dto/api/request/PlaylistReplaceBody'

const Api = {
  get: make<PlaylistItem[]>('/playlist'),
  add: make<null, PlaylistAddBody>('/playlist', 'patch'),
  delete: make<null, PlaylistDeleteBody>('/playlist', 'delete'),
  replace: make<null, PlaylistReplaceBody>('/playlist', 'put')
}

export default Api
