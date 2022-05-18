import { make } from '@app/common/api'

import PlaylistItem from '@app/playlist/data/PlaylistItem'
import PlaylistAddBody from '@app/playlist/data/api/request/PlaylistAddBody'
import PlaylistDeleteBody from '@app/playlist/data/api/request/PlaylistDeleteBody'
import PlaylistReplaceBody from '@app/playlist/data/api/request/PlaylistReplaceBody'

const Api = {
  get: make<PlaylistItem[]>('/playlist'),
  add: make<null, PlaylistAddBody>('/playlist', 'post'),
  delete: make<null, PlaylistDeleteBody>('/playlist', 'delete'),
  replace: make<null, PlaylistReplaceBody>('/playlist', 'put')
}

export default Api
