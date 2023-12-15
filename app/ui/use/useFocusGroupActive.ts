import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'
import useFocusScopeGroupContext from '@app/ui/use/useFocusScopeGroupContext'

const useFocusGroupActive = (): boolean => {
  const [focusScope] = useFocusScopeContext()

  const focusScopeGroup = useFocusScopeGroupContext()

  return focusScope === focusScopeGroup
}

export default useFocusGroupActive
