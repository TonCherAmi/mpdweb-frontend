import Duration from '@app/common/data/Duration'
import DatabaseItem from '@app/database/data/DatabaseItem'
import DatabaseAudioFormat from '@app/database/data/DatabaseAudioFormat'

interface DatabaseFile extends DatabaseItem {
  title: string | null
  artist: string | null
  album: string | null
  duration: Duration
  format: DatabaseAudioFormat
}

export default DatabaseFile
