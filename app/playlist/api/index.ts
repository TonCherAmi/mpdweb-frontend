import { make } from '@app/common/api'

import PlaylistItem from '@app/playlist/dto/PlaylistItem'
import PlaylistAddBody from '@app/playlist/dto/api/request/PlaylistAddBody'
import PlaylistReplaceBody from '@app/playlist/dto/api/request/PlaylistReplaceBody'

const Api = {
  get: make<PlaylistItem[]>('/playlist'),
  add: make<null, PlaylistAddBody>('/playlist/add', 'post'),
  clear: make<null>('/playlist/clear', 'post'),
  replace: make<null, PlaylistReplaceBody>('/playlist/replace', 'post')
}

export default Api
