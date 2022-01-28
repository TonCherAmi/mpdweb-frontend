import { useContext, ContextType } from 'react'

import DatabaseViewContext from '@app/database/views/DatabaseView/contexts/DatabaseViewContext'

const useDatabaseViewContext = (): ContextType<typeof DatabaseViewContext> => {
  return useContext(DatabaseViewContext)
}

export default useDatabaseViewContext
