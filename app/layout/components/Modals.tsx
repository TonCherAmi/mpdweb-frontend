import React, { useMemo } from 'react'

import DatabaseSearchModal, {
  DATABASE_SEARCH_MODAL_ID
} from '@app/database/components/DatabaseSearchModal'

import useKeybindings from '@app/keybindings/use/useKeybindings'
import useModalStateContext from '@app/ui/use/useModalStateContext'
import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'

import FocusScopeGroupContext from '@app/ui/contexts/FocusScopeGroupContext'

const Modals = () => {
  const [focusScope] = useFocusScopeContext()

  const [, setActiveModalId] = useModalStateContext()

  const handlers = useMemo(() => ({
    DATABASE_SEARCH_MODAL: () => setActiveModalId(DATABASE_SEARCH_MODAL_ID)
  }), [setActiveModalId])

  useKeybindings(handlers, {
    disable: !['view', 'queue'].includes(focusScope)
  })

  return (
    <FocusScopeGroupContext.Provider value="modal">
      <DatabaseSearchModal />
    </FocusScopeGroupContext.Provider>
  )
}

export default Modals
