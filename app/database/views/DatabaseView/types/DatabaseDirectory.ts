import DatabaseItem from '@app/database/dto/DatabaseItem'

interface DatabaseDirectory {
  uri: string
  items: ReadonlyArray<DatabaseItem>
  selectedItem: DatabaseItem
}

export default DatabaseDirectory
