import useKeybindings from '@app/keybindings/use/useKeybindings'
import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'
import useFocusScopeGroupContext from '@app/ui/use/useFocusScopeGroupContext'

const useFocusScopeGroupedKeybindings: typeof useKeybindings = (handlers, options) => {
  const [focusScope] = useFocusScopeContext()

  const focusScopeGroup = useFocusScopeGroupContext()

  useKeybindings(handlers, {
    disable: options?.disable || focusScope !== focusScopeGroup
  })
}

export default useFocusScopeGroupedKeybindings
