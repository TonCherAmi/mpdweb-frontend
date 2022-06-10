import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'

import { HighlightStyle } from '@app/database/components/DatabaseItem'

import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'
import useFocusScopeGroupContext from '@app/ui/use/useFocusScopeGroupContext'

const useDatabaseItemHighlightStyle = ({
  isActive,
  isFocusable
}: { isActive: boolean, isFocusable: boolean }): Nullable<HighlightStyle> => {
  const uiInteractionMode = useUiInteractionModeContext()

  const [focusScope] = useFocusScopeContext()

  const focusScopeGroup = useFocusScopeGroupContext()

  if (!isFocusable) {
    return 'muted'
  }

  if (!isActive) {
    return 'secondary'
  }

  if (focusScope !== focusScopeGroup) {
    return null
  }

  if (uiInteractionMode.isKeyboard) {
    return 'primary'
  }

  return null
}

export default useDatabaseItemHighlightStyle
