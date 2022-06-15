import { useContext, ContextType } from 'react'

import ModalContext from '@app/ui/contexts/ModalContext'

const useModalContext = (): ContextType<typeof ModalContext> => {
  return useContext(ModalContext)
}

export default useModalContext
