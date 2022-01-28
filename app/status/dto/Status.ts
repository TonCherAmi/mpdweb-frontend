import State from '@app/status/types/State'
import Duration from '@app/common/dto/Duration'

interface Status {
  state: State
  volume: number
  elapsed: Duration
  duration: Duration
  currentSong: number | null
}

export default Status
