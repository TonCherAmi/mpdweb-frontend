import { useContext, ContextType } from 'react'

import ContextMenuContext from '@app/ui/contexts/ContextMenuContext'

const useContextMenuContext = (): ContextType<typeof ContextMenuContext> => {
  return useContext(ContextMenuContext)
}

export default useContextMenuContext
