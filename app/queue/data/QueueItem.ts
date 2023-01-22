import Duration from '@app/common/data/Duration'
import DatabaseTags from '@app/database/data/DatabaseTags'
import DatabaseAudioFormat from '@app/database/data/DatabaseAudioFormat'

interface QueueItem {
  id: number
  position: number
  uri: string
  tags: DatabaseTags
  duration: Duration
  format: DatabaseAudioFormat
}

export default QueueItem
