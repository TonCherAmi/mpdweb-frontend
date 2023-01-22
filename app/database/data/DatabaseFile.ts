import Duration from '@app/common/data/Duration'
import DatabaseItem from '@app/database/data/DatabaseItem'
import DatabaseTags from '@app/database/data/DatabaseTags'
import DatabaseAudioFormat from '@app/database/data/DatabaseAudioFormat'

interface DatabaseFile extends DatabaseItem {
  duration: Nullable<Duration>
  tags: DatabaseTags
  format: DatabaseAudioFormat
}

export default DatabaseFile
