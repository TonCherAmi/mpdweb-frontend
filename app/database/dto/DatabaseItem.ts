import DatabaseItemType from '@app/database/dto/enums/DatabaseItemType'

interface DatabaseItem {
  uri: string
  type: DatabaseItemType
}

export default DatabaseItem
