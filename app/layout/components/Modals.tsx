import React from 'react'

import useModalKeybindings from '@app/keybindings/use/useModalKeybindings'

import DatabaseSearchModal from '@app/database/components/DatabaseSearchModal'

const Modals = () => {
  useModalKeybindings()

  return (
    <DatabaseSearchModal />
  )
}

export default Modals
