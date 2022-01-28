import { useContext, ContextType } from 'react'

import ModalStateContext from '@app/ui/contexts/ModalStateContext'

const useModalStateContext = (): ContextType<typeof ModalStateContext> => {
  return useContext(ModalStateContext)
}

export default useModalStateContext
