import { make } from '@app/common/api'

import QueueItem from '@app/queue/data/QueueItem'
import QueueAddBody from '@app/queue/data/api/request/QueueAddBody'
import QueueDeleteBody from '@app/queue/data/api/request/QueueDeleteBody'
import QueueReplaceBody from '@app/queue/data/api/request/QueueReplaceBody'

const Api = {
  get: make<ReadonlyArray<QueueItem>>('/queue'),
  add: make<null, QueueAddBody>('/queue', 'post'),
  delete: make<null, QueueDeleteBody>('/queue', 'delete'),
  replace: make<null, QueueReplaceBody>('/queue', 'put'),
}

export default Api
