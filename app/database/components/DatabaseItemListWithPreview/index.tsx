import React from 'react'

import { observer } from 'mobx-react'

import cx from 'classnames'

import * as R from 'ramda'

import throttle from 'lodash.throttle'

import { CommonBindingName } from '@app/common/bindings'

import DatabaseItemDto from '@app/database/dto/DatabaseItem'

import Bindings, { BindingHandlers } from '@app/settings/components/Bindings'

import DatabaseItem from '@app/database/components/DatabaseItem'
import DatabaseViewPreviewHeader from '@app/database/components/DatabaseViewPreviewHeader'

import PlaybackService from '@app/playback/services/PlaybackService'
import PlaylistService from '@app/playlist/services/PlaylistService'

import ItemNavigationStore from '@app/common/stores/ItemNavigationStore'
import DatabasePreviewStore from '@app/database/stores/DatabasePreviewStore'

import styles from './styles.scss'

interface Props {
  areItemsFocusable: boolean
  items: DatabaseItemDto[]
  itemNavigationStore: Nullable<ItemNavigationStore>
  onAscent?: () => void
  onDescent: (item: DatabaseItemDto) => void
}

const DATABSE_ITEM_MOVE_KEYPRESS_REPEAT_THROTTLE_RATE = 25

@observer
class DatabaseItemListWithPreview extends React.Component<Props> {
  state: {
    isKeyboardNavigationActive: boolean
  } = { isKeyboardNavigationActive: false }

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
    if (this.state.isKeyboardNavigationActive) {
      return this.handleContainerMouseMove
    }

    return undefined
  }

  private activateKeyboardNavigation() {
    if (this.state.isKeyboardNavigationActive) {
      return
    }

    this.setState({ isKeyboardNavigationActive: true })
  }

  private deactivateKeyboardNavigation() {
    if (!this.state.isKeyboardNavigationActive) {
      return
    }

    this.setState({ isKeyboardNavigationActive: false })
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
    return this.props.areItemsFocusable && this.isItemSelected(index)
  }

  private isItemSelected = (index: Nullable<number>) => {
    return this.state.isKeyboardNavigationActive
      && R.equals(this.props.itemNavigationStore?.currentItemIndex, index)
  }

  private handleItemClick = (item: DatabaseItemDto) => () => {
    this.deactivateKeyboardNavigation()

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
      this.deactivateKeyboardNavigation()
    }
  }

  private handleNextItemKeyPress = throttle(() => {
    if (!this.state.isKeyboardNavigationActive) {
      this.activateKeyboardNavigation()

      return
    }

    this.props.itemNavigationStore?.goToNextItem()
  }, DATABSE_ITEM_MOVE_KEYPRESS_REPEAT_THROTTLE_RATE)

  private handlePrevItemKeyPress = throttle(() => {
    if (!this.state.isKeyboardNavigationActive) {
      this.activateKeyboardNavigation()

      return
    }

    this.props.itemNavigationStore?.goToPrevItem()
  }, DATABSE_ITEM_MOVE_KEYPRESS_REPEAT_THROTTLE_RATE)

  private handleFirstItemKeyPress = () => {
    this.activateKeyboardNavigation()

    this.props.itemNavigationStore?.goToFirstItem()
  }

  private handleLastItemKeyPress = () => {
    this.activateKeyboardNavigation()

    this.props.itemNavigationStore?.goToLastItem()
  }

  private handleDescendKeyPress = () => {
    if (!this.state.isKeyboardNavigationActive) {
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

    this.activateKeyboardNavigation()

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
          id="asdf"
          handlers={this.bindingHandlers}
        />
        <div className={cx(styles.container, styles.column, styles.split)}>
          {this.props.children}
          <div className={styles.scrollable} onMouseMove={this.containerMouseMoveHandler}>
            <For of={this.props.items} body={(item, index) => (
              <DatabaseItem
                key={item.uri}
                isFocused={this.isItemFocused(index)}
                isSelected={this.isItemSelected(index)}
                isMouseDisabled={this.state.isKeyboardNavigationActive}
                item={item}
                onClick={this.handleItemClick(item)}
                onMouseOver={this.handleItemMouseOver(item)}
                onAddClick={this.handleItemAddClick(item)}
                onPlayClick={this.handleItemPlayClick(item)}
              />
            )} />
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
                )} />
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
