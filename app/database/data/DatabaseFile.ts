import Duration from '@app/common/data/Duration'
import DatabaseItem from '@app/database/data/DatabaseItem'
import DatabaseTags from '@app/database/data/DatabaseTags'
import DatabaseAudioFormat from '@app/database/data/DatabaseAudioFormat'

interface DatabaseFile extends DatabaseItem {
  type: 'file'
  duration: Duration
  tags: DatabaseTags
  format: Nullable<DatabaseAudioFormat>
  updatedAt: string
}

export default DatabaseFile
