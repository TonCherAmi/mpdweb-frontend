import { useCallback } from 'react'

import Thunk from '@app/common/types/Thunk'

import useModalStateContext from '@app/ui/use/useModalStateContext'

interface Modal {
  isOpen: boolean
  close: Thunk
}

const useModal = (modalId: string): Modal => {
  const [activeModalId, setActiveModalId] = useModalStateContext()

  const isOpen = modalId === activeModalId

  const close = useCallback(() => {
    setActiveModalId(null)
  }, [setActiveModalId])

  return { isOpen, close }
}

export default useModal
