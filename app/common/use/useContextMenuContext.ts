import { useContext, ContextType } from 'react'

import ContextMenuContext from '@app/common/contexts/ContextMenuContext'

const useContextMenuContext = (): ContextType<typeof ContextMenuContext> => {
  return useContext(ContextMenuContext)
}

export default useContextMenuContext
