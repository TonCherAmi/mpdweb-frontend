import * as R from 'ramda'

import Playlist from '@app/playlists/data/Playlist'
import QueueSource from '@app/queue/data/QueueSource'
import DatabaseItem from '@app/database/data/DatabaseItem'

import QueueApi from '@app/queue/api'

const isFile = (source: Playlist | DatabaseItem): source is DatabaseItem => {
  return R.has('type', source) && source.type !== 'PLAYLIST'
}

const toQueueSource = (source: Playlist | DatabaseItem): QueueSource => {
  const id = isFile(source) ? source.uri : source.name

  const type = isFile(source) ? 'FILE' : 'PLAYLIST'

  return {
    id,
    type,
  }
}

class QueueService {
  add(source: Playlist | DatabaseItem) {
    QueueApi.add({ source: toQueueSource(source) })
  }

  clear() {
    QueueApi.delete({ id: null })
  }

  delete(id: number) {
    QueueApi.delete({ id })
  }

  replace(source: Playlist | DatabaseItem) {
    QueueApi.replace({ source: toQueueSource(source) })
  }
}

export default new QueueService()
