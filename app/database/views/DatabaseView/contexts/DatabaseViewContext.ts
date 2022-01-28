import { createContext } from 'react'

import Handler from '@app/common/types/Handler'
import DatabaseItem from '@app/database/dto/DatabaseItem'
import DatabaseDirectory from '@app/database/views/DatabaseView/types/DatabaseDirectory'

const noop = () => {
  throw Error('DatabaseViewContext provider required')
}

const DatabaseViewContext = createContext<{
  directories: ReadonlyArray<DatabaseDirectory>
  onSelectedItemChange: Handler<DatabaseItem>
}>({ directories: [], onSelectedItemChange: noop })

export default DatabaseViewContext
