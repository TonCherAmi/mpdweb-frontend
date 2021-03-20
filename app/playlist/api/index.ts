import { make, HttpMethod } from '@app/common/api'

import DatabaseFile from '@app/database/dto/DatabaseFile'
import PlaylistAddBody from '@app/playlist/dto/api/request/PlaylistAddBody'

const Api = {
  get: make<DatabaseFile[]>('/playlist'),
  add: make<null, PlaylistAddBody>('/playlist/add', HttpMethod.POST),
  clear: make<null>('/playlist/clear', HttpMethod.POST)
}

export default Api
