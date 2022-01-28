import { useMemo } from 'react'

import * as R from 'ramda'

import Handler from '@app/common/types/Handler'

import { ItemNavigation } from '@app/common/use/useItemNavigation'

import useKeybindings from '@app/keybindings/use/useKeybindings'
import useThrottle from '@app/common/use/useThrottle'
import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'

const ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS = 25

interface Handlers<T> {
  onNavigateLeft?: Handler<T>
  onNavigateRight?: Handler<T>
}

interface Options<T> {
  disable?: boolean
  itemNavigation: ItemNavigation<T>
  handlers: Handlers<T>
}

const useItemListKeybindings = <T> ({
  disable = false,
  itemNavigation,
  handlers: { onNavigateLeft, onNavigateRight } = {}
}: Options<T>) => {
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

  const handleNavigateLeftKeyPress = useThrottle(() => {
    if (R.isNil(onNavigateLeft)) {
      return
    }

    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()
    }

    onNavigateLeft(itemNavigation.currentItem)
  }, ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  const handleNavigateRightKeyPress = useThrottle(() => {
    if (R.isNil(onNavigateRight)) {
      return
    }

    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()
    }

    onNavigateRight(itemNavigation.currentItem)
  }, ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  const handlers = useMemo(() => ({
    NEXT_ITEM: handleNextItemKeyPress,
    PREV_ITEM: handlePrevItemKeyPress,
    FIRST_ITEM: handleFirstItemKeyPress,
    LAST_ITEM: handleLastItemKeyPress,
    NAVIGATE_LEFT: handleNavigateLeftKeyPress,
    NAVIGATE_RIGHT: handleNavigateRightKeyPress
  }), [handleNextItemKeyPress, handlePrevItemKeyPress, handleFirstItemKeyPress, handleLastItemKeyPress, handleNavigateLeftKeyPress, handleNavigateRightKeyPress])

  useKeybindings({ disable, handlers })
}

export default useItemListKeybindings
