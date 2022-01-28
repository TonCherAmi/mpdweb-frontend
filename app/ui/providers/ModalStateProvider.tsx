import React from 'react'

import useModalState from '@app/ui/use/useModalState'

import ModalStateContext from '@app/ui/contexts/ModalStateContext'

const ModalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const modalState = useModalState()

  return (
    <ModalStateContext.Provider value={modalState}>
      {children}
    </ModalStateContext.Provider>
  )
}

export default ModalStateProvider
