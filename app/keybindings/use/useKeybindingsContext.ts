import { useContext, ContextType } from 'react'

import KeybindingsContext from '@app/keybindings/contexts/KeybindingsContext'

const useKeybindingsContext = (): ContextType<typeof KeybindingsContext> => {
  return useContext(KeybindingsContext)
}

export default useKeybindingsContext
