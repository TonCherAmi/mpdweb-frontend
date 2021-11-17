import React from 'react'

import { observer } from 'mobx-react'

import cx from 'classnames'

import * as R from 'ramda'

import throttle from 'lodash.throttle'

import { CommonBindingName } from '@app/common/bindings'

import DatabaseItemDto from '@app/database/dto/DatabaseItem'

import DatabaseItem from '@app/database/components/DatabaseItem'
import DatabaseViewPreviewHeader from '@app/database/components/DatabaseViewPreviewHeader'
import Bindings, { BindingHandlers } from '@app/settings/components/Bindings'

import ItemNavigationStore from '@app/common/stores/ItemNavigationStore'
import DatabasePreviewStore from '@app/database/stores/DatabasePreviewStore'

import PlaybackService from '@app/playback/services/PlaybackService'
import PlaylistService from '@app/playlist/services/PlaylistService'

import styles from './styles.scss'

interface Props {
  isFocusable: boolean
  isKeyboardNavigationActive: boolean
  items: DatabaseItemDto[]
  itemNavigationStore: Nullable<ItemNavigationStore>
  renderPlaceholder?: () => JSX.Element
  onAscent?: () => void
  onDescent: (item: DatabaseItemDto) => void
  onKeyboardNavigationActivation: () => void
  onKeyboardNavigationDeactivation: () => void
}

const DATABASE_ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS = 25

@observer
class DatabaseItemListWithPreview extends React.Component<Props> {
  databasePreviewStore: DatabasePreviewStore = new DatabasePreviewStore()

  componentDidUpdate(prevProps: Props) {
    if (this.props.items !== prevProps.items) {
      this.databasePreviewStore.reset()
    }
  }

  private get bindingHandlers(): BindingHandlers {
    return {
      [CommonBindingName.NEXT_ITEM]: this.handleNextItemKeyPress,
      [CommonBindingName.PREV_ITEM]: this.handlePrevItemKeyPress,
      [CommonBindingName.FIRST_ITEM]: this.handleFirstItemKeyPress,
      [CommonBindingName.LAST_ITEM]: this.handleLastItemKeyPress,
      [CommonBindingName.NAVIGATE_LEFT]: this.handleAscendKeyPress,
      [CommonBindingName.NAVIGATE_RIGHT]: this.handleDescendKeyPress,
      [CommonBindingName.ADD]: this.handleItemAddKeyPress,
      [CommonBindingName.PLAY]: this.handleItemPlayKeyPress
    }
  }

  private get currentItem(): Nullable<DatabaseItemDto> {
    if (R.isNil(this.props.itemNavigationStore)) {
      return null
    }

    return this.props.items[this.props.itemNavigationStore.currentItemIndex]
  }

  private get containerMouseMoveHandler(): undefined | React.EventHandler<React.MouseEvent> {
    if (this.props.isKeyboardNavigationActive) {
      return this.handleContainerMouseMove
    }

    return undefined
  }

  private async add(item: DatabaseItemDto) {
    await PlaylistService.add(item.uri)
  }

  private async play(item: DatabaseItemDto) {
    await PlaylistService.clear()
    await PlaylistService.add(item.uri)
    await PlaybackService.toggle()
  }

  private isItemFocused = (index: Nullable<number>) => {
    return this.props.isFocusable && this.isItemSelected(index)
  }

  private isItemSelected = (index: Nullable<number>) => {
    return this.props.isKeyboardNavigationActive
      && R.equals(this.props.itemNavigationStore?.currentItemIndex, index)
  }

  private handleItemClick = (item: DatabaseItemDto) => () => {
    this.props.onKeyboardNavigationDeactivation()

    this.props.onDescent(item)
  }

  private handleItemAddClick = (item: DatabaseItemDto) => () => {
    this.add(item)
  }

  private handleItemPlayClick = (item: DatabaseItemDto) => () => {
    this.play(item)
  }

  private handleItemMouseOver = (item: DatabaseItemDto) => () => {
    this.databasePreviewStore.retrieve(item)
  }

  private handleContainerMouseMove = (event: React.MouseEvent) => {
    if (event.movementX !== 0 || event.movementY !== 0) {
      this.props.onKeyboardNavigationDeactivation()
    }
  }

  private handleNextItemKeyPress = throttle(() => {
    if (!this.props.isKeyboardNavigationActive) {
      this.props.onKeyboardNavigationActivation()

      return
    }

    this.props.itemNavigationStore?.goToNextItem()
  }, DATABASE_ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  private handlePrevItemKeyPress = throttle(() => {
    if (!this.props.isKeyboardNavigationActive) {
      this.props.onKeyboardNavigationActivation()

      return
    }

    this.props.itemNavigationStore?.goToPrevItem()
  }, DATABASE_ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  private handleFirstItemKeyPress = () => {
    this.props.onKeyboardNavigationActivation()

    this.props.itemNavigationStore?.goToFirstItem()
  }

  private handleLastItemKeyPress = () => {
    this.props.onKeyboardNavigationActivation()

    this.props.itemNavigationStore?.goToLastItem()
  }

  private handleDescendKeyPress = () => {
    if (!this.props.isKeyboardNavigationActive) {
      return
    }

    if (R.isNil(this.currentItem)) {
      return
    }

    this.props.onDescent(this.currentItem)
  }

  private handleAscendKeyPress = () => {
    if (R.isNil(this.props.onAscent)) {
      return
    }

    this.props.onKeyboardNavigationActivation()

    this.props.onAscent()
  }

  private handleItemAddKeyPress = () => {
    if (R.isNil(this.currentItem)) {
      return
    }

    this.add(this.currentItem)
  }

  private handleItemPlayKeyPress = () => {
    if (R.isNil(this.currentItem)) {
      return
    }

    this.play(this.currentItem)
  }

  render() {
    return (
      <div className={cx(styles.container, styles.row)}>
        <Bindings
          id={DatabaseItemListWithPreview.name}
          handlers={this.bindingHandlers}
        />
        <div className={cx(styles.container, styles.column, styles.split)}>
          {this.props.children}
          <div
            className={styles.scrollable}
            onMouseMove={this.containerMouseMoveHandler}
          >
            <Choose>
              <When condition={R.isEmpty(this.props.items)}>
                {this.props.renderPlaceholder?.()}
              </When>
              <Otherwise>
                <For of={this.props.items} body={(item, index) => (
                    <DatabaseItem
                      key={item.uri}
                      isFocused={this.isItemFocused(index)}
                      isSelected={this.isItemSelected(index)}
                      isMouseDisabled={this.props.isKeyboardNavigationActive}
                      item={item}
                      onClick={this.handleItemClick(item)}
                      onMouseOver={this.handleItemMouseOver(item)}
                      onAddClick={this.handleItemAddClick(item)}
                      onPlayClick={this.handleItemPlayClick(item)}
                    />
                  )}
                />
              </Otherwise>
            </Choose>
          </div>
        </div>
        <div className={cx(styles.container, styles.column, styles.split)}>
          <Choose>
            <When condition={!this.databasePreviewStore.isEmpty}>
              <DatabaseViewPreviewHeader
                item={this.databasePreviewStore.item}
                count={this.databasePreviewStore.count}
              />
              <div className={styles.scrollable}>
                <For of={this.databasePreviewStore.children} body={(item) => (
                    <DatabaseItem
                      key={item.uri}
                      isClickable={false}
                      item={item}
                      onAddClick={this.handleItemAddClick(item)}
                      onPlayClick={this.handleItemPlayClick(item)}
                    />
                  )}
                />
              </div>
            </When>
            <Otherwise>
              <div className={styles.placeholder}>
                no preview
              </div>
            </Otherwise>
          </Choose>
        </div>
      </div>
    )
  }
}

export default DatabaseItemListWithPreview
