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
  elapsed: Duration
  duration: Duration
}

interface Status {
  state: State
  volume: number
  song: Nullable<CurrentSong>
  queue: Queue
  single: 'ON' | 'OFF' | 'ONESHOT'
  random: boolean
  repeat: boolean
  consume: boolean
}

export default Status
