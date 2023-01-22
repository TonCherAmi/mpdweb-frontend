import { useMemo } from 'react'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'

import Playlist from '@app/playlists/data/Playlist'
import { QueueSource } from '@app/channel/use/useChannel'
import { OneshotState } from '@app/status/data/Status'
import QueueItem from '@app/queue/data/QueueItem'
import DatabaseItem from '@app/database/data/DatabaseItem'

import useChannelActionContext from '@app/channel/use/useChannelActionContext'

const isFile = (source: Playlist | DatabaseItem | QueueItem): source is DatabaseItem | QueueItem => {
  return R.has('type', source) && source.type !== 'playlist'
}

const toQueueSource = (source: Playlist | DatabaseItem | QueueItem): QueueSource => {
  return isFile(source)
    ? { file: { uri: source.uri } }
    : { playlist: { name: source.name } }
}

interface Actions {
  add: (source: Playlist | DatabaseItem | QueueItem) => void
  replace: (source: Playlist | DatabaseItem) => void
  next: Thunk
  prev: Thunk
  clear: Thunk
  remove: (item: QueueItem) => void
  repeat: (state: boolean) => void
  consume: (state: OneshotState) => void
  random: (state: boolean) => void
  single: (state: OneshotState) => void
}

const useQueueActions = (): Actions => {
  const perform = useChannelActionContext()

  return useMemo(() => ({
    add: (source) => perform({ queueAdd: { source: toQueueSource(source) } }),
    replace: (source) => perform({ queueReplace: { source: toQueueSource(source) } }),
    remove: ({ id }) => perform({ queueRemove: { id } }),
    clear: () => perform('queueClear'),
    next: () => perform('queueNext'),
    prev: () => perform('queuePrev'),
    repeat: (state: boolean) => perform({ queueRepeat: { state } }),
    consume: (state: OneshotState) => perform({ queueConsume: { state } }),
    random: (state: boolean) => perform({ queueRandom: { state } }),
    single: (state: OneshotState) => perform({ queueSingle: { state } }),
  }), [perform])
}

export default useQueueActions
