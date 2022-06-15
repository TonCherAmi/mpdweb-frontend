import React, { useCallback } from 'react'

import Thunk from '@app/common/types/Thunk'

import useModalContext from '@app/ui/use/useModalContext'

interface Modal {
  open: Thunk
  close: Thunk
}

const useModal = (
  render: (onClose: Thunk) => React.ReactNode
): Modal => {
  const setModal = useModalContext()

  const handleClose = useCallback(() => {
    setModal(null)
  }, [setModal])

  const open = useCallback(() => {
    setModal({
      component: render(handleClose),
    })
  }, [render, setModal, handleClose])

  const close = useCallback(() => {
    setModal(null)
  }, [setModal])

  return { open, close }
}

export default useModal
