import DatabaseItem from '@app/database/data/DatabaseItem'
import DatabaseFile from '@app/database/data/DatabaseFile'

export const isDatabaseFile = (item: DatabaseItem): item is DatabaseFile => {
  return item.type === 'file'
}
