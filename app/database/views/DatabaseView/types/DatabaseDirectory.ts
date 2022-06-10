import DatabaseItem from '@app/database/data/DatabaseItem'
import DatabaseCount from '@app/database/data/DatabaseCount'

interface DatabaseDirectory {
  uri: string
  items: ReadonlyArray<DatabaseItem>
  count: DatabaseCount
  selectedItem: DatabaseItem
}

export default DatabaseDirectory
