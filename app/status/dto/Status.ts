import State from '@app/status/types/State'
import Duration from '@app/common/dto/Duration'

interface CurrentSong {
  id: number
  position: number
  elapsed: Duration
  duration: Duration
}

interface CurrentPlaylist {
  length: number
  elapsed: Duration
  duration: Duration
}

interface Status {
  state: State
  volume: number
  song: Nullable<CurrentSong>
  playlist: CurrentPlaylist
}

export default Status
