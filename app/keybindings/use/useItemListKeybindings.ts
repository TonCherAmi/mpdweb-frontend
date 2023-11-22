import { ItemListNavigation } from '@app/common/use/useItemListNavigation'

import useThrottle from '@app/common/use/useThrottle'
import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'

const ITEM_LIST_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS = 25

interface Options {
  disable?: boolean
}

const useItemListKeybindings = <T> (itemListNavigation: ItemListNavigation<T>, {
  disable = false,
}: Options = {}) => {
  const uiInteractionMode = useUiInteractionModeContext()

  const handleNextItemKeyPress = useThrottle(() => {
    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()

      return
    }

    itemListNavigation.goToNextItem()
  }, ITEM_LIST_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  const handlePrevItemKeyPress = useThrottle(() => {
    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()

      return
    }

    itemListNavigation.goToPrevItem()
  }, ITEM_LIST_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  const handleFirstItemKeyPress = () => {
    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()
    }

    itemListNavigation.goToFirstItem()
  }

  const handleLastItemKeyPress = () => {
    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()
    }

    itemListNavigation.goToLastItem()
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
