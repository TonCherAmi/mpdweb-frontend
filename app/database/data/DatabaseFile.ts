import Duration from '@app/common/data/Duration'
import DatabaseItem from '@app/database/data/DatabaseItem'

interface DatabaseFile extends DatabaseItem {
  title: string | null
  artist: string | null
  duration: Duration
}

export default DatabaseFile
