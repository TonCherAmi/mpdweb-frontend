import State from '@app/status/types/State'
import Duration from '@app/common/data/Duration'

interface CurrentSong {
  id: number
  position: number
  elapsed: Duration
  duration: Duration
}

interface Queue {
  length: number
}

export type OneshotState = 'on' | 'off' | 'oneshot'

interface Status {
  state: State
  volume: number
  song: Nullable<CurrentSong>
  queue: Queue
  random: boolean
  repeat: boolean
  single: OneshotState
  consume: OneshotState
}

export default Status
