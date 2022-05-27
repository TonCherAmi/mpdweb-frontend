import Duration from '@app/common/data/Duration'
import DatabaseItem from '@app/database/data/DatabaseItem'
import DatabaseAudioFormat from '@app/database/data/DatabaseAudioFormat'

interface DatabaseFile extends DatabaseItem {
  title: Nullable<string>
  artist: Nullable<string>
  album: Nullable<string>
  duration: Duration
  format: DatabaseAudioFormat
}

export default DatabaseFile
