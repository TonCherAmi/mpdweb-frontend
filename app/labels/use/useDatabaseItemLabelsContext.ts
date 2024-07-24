import { ContextType, useContext } from 'react'

import DatabaseItemLabelsContext from '@app/labels/contexts/DatabaseItemLabelsContext'

const useDatabaseItemLabelsContext = (): ContextType<typeof DatabaseItemLabelsContext>  => {
  return useContext(DatabaseItemLabelsContext)
}

export default useDatabaseItemLabelsContext
