import { ItemNavigation } from '@app/common/use/useItemNavigation'

import useThrottle from '@app/common/use/useThrottle'
import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'

const ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS = 25

interface Options {
  disable?: boolean
}

const useItemListKeybindings = <T> (itemNavigation: ItemNavigation<T>, {
  disable = false,
}: Options = {}) => {
  const uiInteractionMode = useUiInteractionModeContext()

  const handleNextItemKeyPress = useThrottle(() => {
    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()

      return
    }

    itemNavigation.goToNextItem()
  }, ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  const handlePrevItemKeyPress = useThrottle(() => {
    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()

      return
    }

    itemNavigation.goToPrevItem()
  }, ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  const handleFirstItemKeyPress = () => {
    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()
    }

    itemNavigation.goToFirstItem()
  }

  const handleLastItemKeyPress = () => {
    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()
    }

    itemNavigation.goToLastItem()
  }

  const handlers = {
    NEXT_ITEM: handleNextItemKeyPress,
    PREV_ITEM: handlePrevItemKeyPress,
    FIRST_ITEM: handleFirstItemKeyPress,
    LAST_ITEM: handleLastItemKeyPress,
  }

  useFocusScopeGroupedKeybindings(handlers, { disable })
}

export default useItemListKeybindings
