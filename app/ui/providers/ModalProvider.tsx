import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'

import * as R from 'ramda'

import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'

import ModalContext, { Modal } from '@app/ui/contexts/ModalContext'
import FocusScopeGroupContext from '@app/ui/contexts/FocusScopeGroupContext'

const modalContainerElement = document.getElementById('modal')

if (R.isNil(modalContainerElement)) {
  throw Error('modal container not found')
}

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<Nullable<Modal>>(null)

  const [, dispatchFocusScope] = useFocusScopeContext()

  useEffect(() => {
    if (R.isNil(modal)) {
      return
    }

    dispatchFocusScope({ type: 'toggle', scope: 'modal' })

    return () => {
      dispatchFocusScope({ type: 'toggle', scope: 'modal' })
    }
  }, [modal, dispatchFocusScope])

  const renderModal = () => {
    if (R.isNil(modal)) {
      return null
    }

    return ReactDOM.createPortal((
      <FocusScopeGroupContext.Provider value="modal">
        {modal.component}
      </FocusScopeGroupContext.Provider>
    ), modalContainerElement)
  }

  return (
    <ModalContext.Provider value={setModal}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  )
}

export default ModalProvider
