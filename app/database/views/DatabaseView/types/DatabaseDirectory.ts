import DatabaseItem from '@app/database/data/DatabaseItem'

interface DatabaseDirectory {
  uri: string
  items: ReadonlyArray<DatabaseItem>
  selectedItem: DatabaseItem
}

export default DatabaseDirectory
