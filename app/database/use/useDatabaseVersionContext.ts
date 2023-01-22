import { useContext, ContextType } from 'react'

import DatabaseVersionContext from '@app/database/contexts/DatabaseVersionContext'

const useDatabaseVersionContext = (): ContextType<typeof DatabaseVersionContext> => {
  return useContext(DatabaseVersionContext)
}

export default useDatabaseVersionContext
