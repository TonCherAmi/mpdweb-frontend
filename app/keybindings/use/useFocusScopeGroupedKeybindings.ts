import useKeybindings from '@app/keybindings/use/useKeybindings'
import useFocusGroupActive from '@app/ui/use/useFocusGroupActive'

const useFocusScopeGroupedKeybindings: typeof useKeybindings = (handlers, options) => {
  const isFocusGroupActive = useFocusGroupActive()

  useKeybindings(handlers, {
    disable: options?.disable || !isFocusGroupActive,
  })
}

export default useFocusScopeGroupedKeybindings
