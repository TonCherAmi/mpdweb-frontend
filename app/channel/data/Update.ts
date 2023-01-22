import Status from '@app/channel/data/Status'
import StatusData from '@app/status/data/Status'
import QueueItem from '@app/queue/data/QueueItem'

interface DbUpdate {
  type: 'db'
}

interface PlaylistsUpdate {
  type: 'playlists'
}

interface StatusUpdate {
  type: 'status'
  data: StatusData
}

interface QueueUpdate {
  type: 'queue'
  data: ReadonlyArray<QueueItem>
}

type UpdateKind = DbUpdate | PlaylistsUpdate | StatusUpdate | QueueUpdate

type Update = Status & {
  items: Nullable<ReadonlyArray<UpdateKind>>,
}

export default Update
