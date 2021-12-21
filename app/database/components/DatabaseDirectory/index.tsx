import React from 'react'

import { reaction } from 'mobx'
import { observer } from 'mobx-react'

import * as R from 'ramda'

import cx from 'classnames'

import throttle from 'lodash.throttle'

import { CommonBindingName } from '@app/common/bindings'

import DatabaseItemDto from '@app/database/dto/DatabaseItem'

import DatabaseSearch from '@app/database/components/DatabaseSearch'
import Bindings, { BindingHandlers } from '@app/settings/components/Bindings'
import DatabaseItem, {
  DatabaseItemRoundedCornersPosition,
  DatabaseItemHighlightStyle
} from '@app/database/components/DatabaseItem'
import ScrollableContainer from '@app/common/components/ScrollableContainer'

import UiStore from '@app/ui/stores/UiStore'
import ItemSearchStore from '@app/common/stores/ItemSearchStore'
import SearchStateStore from '@app/common/stores/SearchStateStore'
import ItemNavigationStore from '@app/common/stores/ItemNavigationStore'
import DatabaseDirectoryStore from '@app/database/stores/DatabaseDirectoryStore'

import styles from './styles.scss'

interface Props {
  isActive: boolean
  store: DatabaseDirectoryStore
  highlightedItemUri: Nullable<string>
  roundedCornersPositions: DatabaseItemRoundedCornersPosition[]
  onAdd: (item: DatabaseItemDto) => void
  onPlay: (item: DatabaseItemDto) => void
  onAscent: () => void
  onDescent: (item: DatabaseItemDto) => void
}

const DATABASE_ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS = 25

@observer
class DatabaseDirectory extends React.Component<Props> {
  private readonly uiStore = UiStore

  private readonly searchStateStore: SearchStateStore = new SearchStateStore()

  private readonly scrollableContainerRef = React.createRef<ScrollableContainer>()

  private searchItemNavigationStore: Nullable<ItemNavigationStore> = null

  private currentItemRef: Nullable<DatabaseItem>

  private onHighlightedItemUriUpdate: Nullable<() => unknown>

  componentDidMount() {
    if (!this.props.isActive) {
      this.currentItemRef?.scrollIntoView({ block: 'center' })
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.highlightedItemUri !== this.props.highlightedItemUri) {
      this.onHighlightedItemUriUpdate?.()
    }
  }

  componentWillUnmount() {
    this.currentItemIndexSettingReactionDisposer()
  }

  private get items(): DatabaseItemDto[] {
    if (!this.searchStateStore.isInactive) {
      return this.itemSearchStore.items
    }

    return this.props.store.items
  }

  private get itemNavigationStore(): ItemNavigationStore {
    if (!this.searchStateStore.isInactive && !R.isNil(this.searchItemNavigationStore)) {
      return this.searchItemNavigationStore
    }

    return this.props.store.itemNavigationStore
  }

  private get itemSearchStore(): ItemSearchStore<DatabaseItemDto> {
    return this.props.store.itemSearchStore
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
      [CommonBindingName.PLAY]: this.handleItemPlayKeyPress,
      [CommonBindingName.SEARCH_FOCUS]: this.handleSearchFocusKeyPress,
      [CommonBindingName.SEARCH_EXIT]: this.handleSearchExit
    }
  }

  private get currentItem(): Nullable<DatabaseItemDto> {
    return this.items[this.itemNavigationStore.currentItemIndex]
  }

  // The idea is to only react to mouse movement when the keyboard interaction mode is on
  private get containerMouseMoveHandler(): undefined | React.EventHandler<React.MouseEvent> {
    if (this.uiStore.isKeyboardInteractionModeOn) {
      return this.handleContainerMouseMove
    }

    return undefined
  }

  private setCurrentItemIndexByUri(uri: string) {
    const index = R.findIndex(
      R.propEq('uri', uri),
      this.props.store.items
    )

    if (index === -1) {
      return
    }

    this.props.store.itemNavigationStore.setCurrentItemIndex(index)
  }

  private descend(item: DatabaseItemDto) {
    this.props.onDescent(item)

    if (!this.searchStateStore.isInactive) {
      this.setCurrentItemIndexByUri(item.uri)

      this.searchStateStore.deactivate()

      setTimeout(() => {
        this.currentItemRef?.scrollIntoView({ block: 'center' })

        this.itemSearchStore.reset(this.props.store.items)
      })
    }
  }

  private readonly currentItemIndexSettingReactionDisposer = reaction(() => this.props.store.items, () => {
    if (this.props.isActive || R.isNil(this.props.highlightedItemUri)) {
      return
    }

    this.setCurrentItemIndexByUri(this.props.highlightedItemUri)
  }, { fireImmediately: true })

  private readonly withCurrentItem = (fn: (currentItem: DatabaseItemDto) => unknown) => (): Nullable<unknown> => {
    if (R.isNil(this.currentItem)) {
      return null
    }

    return fn(this.currentItem)
  }

  private readonly itemHighlightStyle = (index: number): Nullable<DatabaseItemHighlightStyle> => {
    if (this.items[index].uri === this.props.highlightedItemUri) {
      return DatabaseItemHighlightStyle.SECONDARY
    }

    const isHighlightedItem = this.props.isActive
      && this.uiStore.isKeyboardInteractionModeOn
      && index === this.itemNavigationStore.currentItemIndex

    if (isHighlightedItem && this.searchStateStore.isFocused) {
      return DatabaseItemHighlightStyle.MUTED
    }

    if (isHighlightedItem) {
      return DatabaseItemHighlightStyle.PRIMARY
    }

    return null
  }

  private readonly handleItemRef = (index: number) => (itemRef: Nullable<DatabaseItem>) => {
    const isCurrentItem = index === this.itemNavigationStore.currentItemIndex

    const isHighlightedItem = !R.isNil(this.props.highlightedItemUri)
      && this.props.highlightedItemUri === this.items[index]?.uri

    const isCurrentItemRef = isCurrentItem || isHighlightedItem

    if (isCurrentItemRef) {
      this.currentItemRef = itemRef

      if (R.isNil(itemRef)) {
        return
      }
    }

    if (isCurrentItem && this.props.isActive) {
      const isFirstItem = this.itemNavigationStore.currentItemIndex === 0

      if (isFirstItem) {
        // workaround to prevent jittery horizontal scroll
        this.scrollableContainerRef.current?.scrollUp()
      } else {
        this.currentItemRef?.scrollIntoView({ block: 'nearest' })
      }
    }
  }

  private readonly handleNextItemKeyPress = throttle(() => {
    if (!this.uiStore.isKeyboardInteractionModeOn) {
      this.uiStore.activateKeyboardInteractionMode()

      return
    }

    this.itemNavigationStore?.goToNextItem()
  }, DATABASE_ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  private readonly handlePrevItemKeyPress = throttle(() => {
    if (!this.uiStore.isKeyboardInteractionModeOn) {
      this.uiStore.activateKeyboardInteractionMode()

      return
    }

    this.itemNavigationStore?.goToPrevItem()
  }, DATABASE_ITEM_NAVIGATION_KEYPRESS_REPEAT_WAIT_MS)

  private readonly handleFirstItemKeyPress = () => {
    this.uiStore.activateKeyboardInteractionMode()

    this.itemNavigationStore.goToFirstItem()
  }

  private readonly handleLastItemKeyPress = () => {
    this.uiStore.activateKeyboardInteractionMode()

    this.itemNavigationStore.goToLastItem()
  }

  private readonly handleAscendKeyPress = () => {
    this.uiStore.activateKeyboardInteractionMode()

    this.props.onAscent()
  }

  private readonly handleDescendKeyPress = this.withCurrentItem((currentItem) => {
    if (!this.uiStore.isKeyboardInteractionModeOn) {
      return
    }

    this.descend(currentItem)
  })

  private readonly handleItemAddKeyPress = this.withCurrentItem((currentItem) => {
    this.props.onAdd(currentItem)
  })

  private readonly handleItemPlayKeyPress = this.withCurrentItem((currentItem) => {
    this.props.onPlay(currentItem)
  })

  private readonly handleSearchFocusKeyPress = () => {
    if (R.isNil(this.searchItemNavigationStore)) {
      this.searchItemNavigationStore = new ItemNavigationStore(this.items)
    }

    this.uiStore.activateKeyboardInteractionMode()

    this.searchStateStore.focus()
  }

  private readonly handleItemClick = (item: DatabaseItemDto) => () => {
    this.setCurrentItemIndexByUri(item.uri)

    this.uiStore.activateMouseInteractionMode()

    this.descend(item)
  }

  private readonly handleItemAddClick = (item: DatabaseItemDto) => () => {
    this.props.onAdd(item)
  }

  private readonly handleItemPlayClick = (item: DatabaseItemDto) => () => {
    this.props.onPlay(item)
  }

  private handleSearchChange = (value: string) => {
    this.itemSearchStore.search(value)

    this.searchItemNavigationStore?.reset(this.itemSearchStore.items)
  }

  private handleSearchCompletion = () => {
    if (this.itemNavigationStore?.isEmpty) {
      return
    }

    this.searchStateStore.unfocus()

    this.uiStore.activateKeyboardInteractionMode()
  }

  private readonly handleSearchExit = () => {
    if (!R.isEmpty(this.itemSearchStore.input) && !R.isNil(this.currentItem)) {
      this.setCurrentItemIndexByUri(this.currentItem?.uri)
    }

    this.searchStateStore.deactivate()

    this.uiStore.activateKeyboardInteractionMode()
  }

  private readonly handleContainerMouseMove = (event: React.MouseEvent) => {
    if (event.movementX !== 0 || event.movementY !== 0) {
      this.uiStore.activateMouseInteractionMode()
    }
  }

  private readonly renderItem = (item: DatabaseItemDto, index: Nullable<number>): Nullable<JSX.Element> => {
    if (R.isNil(index)) {
      return null
    }

    return (
      <DatabaseItem
        key={item.uri}
        ref={this.handleItemRef(index)}
        isMouseDisabled={this.uiStore.isKeyboardInteractionModeOn}
        item={item}
        highlightStyle={this.itemHighlightStyle(index)}
        roundedCornersPositions={this.props.roundedCornersPositions}
        onClick={this.handleItemClick(item)}
        onAddClick={this.handleItemAddClick(item)}
        onPlayClick={this.handleItemPlayClick(item)}
      />
    )
  }

  render() {
    return (
      <div className={cx(styles.container)}>
        <If condition={this.props.isActive}>
          <Bindings
            id={DatabaseDirectory.name}
            handlers={this.bindingHandlers}
          />
        </If>
        <If condition={!this.searchStateStore.isInactive}>
          <DatabaseSearch
            isFocused={this.searchStateStore.isFocused}
            value={this.itemSearchStore.input}
            onExit={this.handleSearchExit}
            onChange={this.handleSearchChange}
            onDescent={this.handleDescendKeyPress}
            onCompletion={this.handleSearchCompletion}
          />
        </If>
        <ScrollableContainer
          ref={this.scrollableContainerRef}
          className={styles.scrollable}
          onMouseMove={this.containerMouseMoveHandler}
        >
          <For of={this.items} body={this.renderItem} />
        </ScrollableContainer>
      </div>
    )
  }
}

export default DatabaseDirectory
