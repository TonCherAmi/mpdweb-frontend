import React from 'react'

import { observer } from 'mobx-react'

import * as R from 'ramda'

import Keybindings, { KeybindingHandlers } from '@app/keybindings/components/Keybindings'

import UiStore from '@app/ui/stores/UiStore'
import ItemNavigationStore from '@app/common/stores/ItemNavigationStore'

import throttle from 'lodash.throttle'

interface Props<T> {
  scope?: string
  items: T[]
  itemNavigationStore: ItemNavigationStore
  onNavigateLeft?: (item: T) => unknown
  onNavigateRight?: (item: T) => unknown
}

const ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS = 25

@observer
class ItemListKeybindings<T> extends React.Component<Props<T>> {
  private readonly uiStore = UiStore

  private get bindingHandlers(): KeybindingHandlers {
    return {
      NEXT_ITEM: this.handleNextItemKeyPress,
      PREV_ITEM: this.handlePrevItemKeyPress,
      FIRST_ITEM: this.handleFirstItemKeyPress,
      LAST_ITEM: this.handleLastItemKeyPress,
      NAVIGATE_LEFT: this.handleNavigateLeftKeyPress,
      NAVIGATE_RIGHT: this.handleNavigateRightKeyPress
    }
  }

  private get currentItem(): Nullable<T> {
    return this.props.items[this.props.itemNavigationStore.currentItemIndex]
  }

  private readonly handleNextItemKeyPress = throttle(() => {
    if (!this.uiStore.isKeyboardInteractionModeOn) {
      this.uiStore.activateKeyboardInteractionMode()

      return
    }

    this.props.itemNavigationStore?.goToNextItem()
  }, ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  private readonly handlePrevItemKeyPress = throttle(() => {
    if (!this.uiStore.isKeyboardInteractionModeOn) {
      this.uiStore.activateKeyboardInteractionMode()

      return
    }

    this.props.itemNavigationStore?.goToPrevItem()
  }, ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  private readonly handleFirstItemKeyPress = () => {
    if (!this.uiStore.isKeyboardInteractionModeOn) {
      this.uiStore.activateKeyboardInteractionMode()
    }

    this.props.itemNavigationStore.goToFirstItem()
  }

  private readonly handleLastItemKeyPress = () => {
    if (!this.uiStore.isKeyboardInteractionModeOn) {
      this.uiStore.activateKeyboardInteractionMode()
    }

    this.props.itemNavigationStore.goToLastItem()
  }

  private readonly handleNavigateLeftKeyPress = () => {
    if (R.isNil(this.props.onNavigateLeft) || R.isNil(this.currentItem)) {
      return
    }

    if (!this.uiStore.isKeyboardInteractionModeOn) {
      this.uiStore.activateKeyboardInteractionMode()
    }

    this.props.onNavigateLeft(this.currentItem)
  }

  private readonly handleNavigateRightKeyPress = () => {
    if (R.isNil(this.props.onNavigateRight) || R.isNil(this.currentItem)) {
      return
    }

    if (!this.uiStore.isKeyboardInteractionModeOn) {
      this.uiStore.activateKeyboardInteractionMode()

      return
    }

    this.props.onNavigateRight(this.currentItem)
  }

  render() {
    return (
      <Keybindings
        scope={this.props.scope}
        handlers={this.bindingHandlers}
      />
    )
  }
}

export default ItemListKeybindings
