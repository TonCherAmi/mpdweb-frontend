import { HighlightStyle } from '@app/database/components/DatabaseItem'

import useFocusGroupActive from '@app/ui/use/useFocusGroupActive'
import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'

const useDatabaseItemHighlightStyle = ({
  isActive,
  isFocusable,
}: { isActive: boolean, isFocusable: boolean }): Nullable<HighlightStyle> => {
  const uiInteractionMode = useUiInteractionModeContext()

  const isFocusGroupActive = useFocusGroupActive()

  if (!isFocusable) {
    return 'muted'
  }

  if (!isActive) {
    return 'secondary'
  }

  if (!isFocusGroupActive) {
    return null
  }

  if (uiInteractionMode.isKeyboard) {
    return 'primary'
  }

  return null
}

export default useDatabaseItemHighlightStyle
