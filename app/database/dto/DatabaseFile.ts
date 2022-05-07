import Duration from '@app/common/dto/Duration'
import DatabaseItem from '@app/database/dto/DatabaseItem'

interface DatabaseFile extends DatabaseItem {
  title: string | null
  artist: string | null
  duration: Duration
}

export default DatabaseFile
