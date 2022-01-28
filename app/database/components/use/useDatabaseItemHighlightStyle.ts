import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'

import { HighlightStyle } from '@app/database/components/DatabaseItem'

const useDatabaseItemHighlightStyle = ({
  isActive,
  isFocusable
}: { isActive: boolean, isFocusable: boolean, }): Nullable<HighlightStyle> => {
  const uiInteractionMode = useUiInteractionModeContext()

  if (!isFocusable) {
    return 'muted'
  }

  if (!isActive) {
    return 'secondary'
  }

  if (uiInteractionMode.isKeyboard) {
    return 'primary'
  }

  return null
}

export default useDatabaseItemHighlightStyle
