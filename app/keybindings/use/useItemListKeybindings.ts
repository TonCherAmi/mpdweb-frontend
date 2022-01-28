import { useMemo } from 'react'

import { ItemNavigation } from '@app/common/use/useItemNavigation'

import useKeybindings from '@app/keybindings/use/useKeybindings'
import useThrottle from '@app/common/use/useThrottle'
import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'

const ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS = 25

interface Options {
  disable?: boolean
}

const useItemListKeybindings = <T> (itemNavigation: ItemNavigation<T>, {
  disable = false
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

  const handlers = useMemo(() => ({
    NEXT_ITEM: handleNextItemKeyPress,
    PREV_ITEM: handlePrevItemKeyPress,
    FIRST_ITEM: handleFirstItemKeyPress,
    LAST_ITEM: handleLastItemKeyPress,
  }), [handleNextItemKeyPress, handlePrevItemKeyPress, handleFirstItemKeyPress, handleLastItemKeyPress])

  useKeybindings(handlers, { disable })
}

export default useItemListKeybindings
