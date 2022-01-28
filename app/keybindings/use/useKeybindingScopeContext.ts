import { useContext } from 'react'

import KeybindingScope from '@app/keybindings/types/KeybindingScope'

import KeybindingScopeContext from '@app/keybindings/contexts/KeybindingScopeContext'

const useKeybindingScopeContext = (): KeybindingScope => {
  return useContext(KeybindingScopeContext)
}

export default useKeybindingScopeContext
