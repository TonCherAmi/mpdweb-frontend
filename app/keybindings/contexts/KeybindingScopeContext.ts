import { createContext } from 'react'

import KeybindingScope from '@app/keybindings/types/KeybindingScope'

const KeybindingScopeContext = createContext<KeybindingScope>('view')

export default KeybindingScopeContext
