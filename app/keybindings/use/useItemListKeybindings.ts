import { ItemListNavigation } from '@app/common/use/useItemListNavigation'

import useThrottle from '@app/common/use/useThrottle'
import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'

const ITEM_LIST_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS = 25

interface Options {
  disable?: boolean
  direction?: 'vertical' | 'horizontal'
}

const useItemListKeybindings = <T> (itemListNavigation: ItemListNavigation<T>, {
  disable = false,
  direction = 'vertical',
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

  let nextPrevHandlers

  if (direction === 'vertical') {
    nextPrevHandlers = {
      NAVIGATE_DOWN: handleNextItemKeyPress,
      NAVIGATE_UP: handlePrevItemKeyPress,
    }
  }

  if (direction === 'horizontal') {
    nextPrevHandlers = {
      NAVIGATE_RIGHT: handleNextItemKeyPress,
      NAVIGATE_LEFT: handlePrevItemKeyPress,
    }
  }

  const handlers = {
    FIRST_ITEM: handleFirstItemKeyPress,
    LAST_ITEM: handleLastItemKeyPress,
    ...nextPrevHandlers,
  }

  useFocusScopeGroupedKeybindings(handlers, { disable })
}

export default useItemListKeybindings
