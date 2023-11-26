import { ItemGridNavigation } from '@app/common/use/useItemGridNavigation'

import useThrottle from '@app/common/use/useThrottle'
import useItemListKeybindings from '@app/keybindings/use/useItemListKeybindings'
import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'

const ITEM_GRID_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS = 25

interface Options {
  disable?: boolean
  calculateRowLength: () => number
}

const useItemGridKeybindings = <T> (itemGridNavigation: ItemGridNavigation<T>, {
  disable = false,
  calculateRowLength,
}: Options) => {
  const uiInteractionMode = useUiInteractionModeContext()

  const handleItemBelowKeyPress = useThrottle(() => {
    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()
    }

    itemGridNavigation.goToItemBelow(calculateRowLength())
  }, ITEM_GRID_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  const handleItemAboveKeyPress = useThrottle(() => {
    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()
    }

    itemGridNavigation.goToItemAbove(calculateRowLength())
  }, ITEM_GRID_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  const handlers = {
    NAVIGATE_UP: handleItemAboveKeyPress,
    NAVIGATE_DOWN: handleItemBelowKeyPress,
  }

  useFocusScopeGroupedKeybindings(handlers, { disable })

  useItemListKeybindings(itemGridNavigation, {
    disable,
    direction: 'horizontal',
  })
}

export default useItemGridKeybindings
