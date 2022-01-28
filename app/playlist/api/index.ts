import { make } from '@app/common/api'

import DatabaseFile from '@app/database/dto/DatabaseFile'
import PlaylistAddBody from '@app/playlist/dto/api/request/PlaylistAddBody'

const Api = {
  get: make<DatabaseFile[]>('/playlist'),
  add: make<null, PlaylistAddBody>('/playlist/add', 'post'),
  clear: make<null>('/playlist/clear', 'post')
}

export default Api
