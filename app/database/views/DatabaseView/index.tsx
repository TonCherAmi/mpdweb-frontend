import React from 'react'

import {
  withRouter,
  RouteChildrenProps,
  RouteComponentProps
} from 'react-router'

import { observer } from 'mobx-react'

import cx from 'classnames'

import * as R from 'ramda'

import throttle from 'lodash.throttle'

import { CommonBindingName } from '@app/common/bindings'

import SearchState from '@app/common/dto/enums/SearchState'
import DatabaseItemDto from '@app/database/dto/DatabaseItem'

import DatabaseItem from '@app/database/components/DatabaseItem'
import DatabaseViewSearch from '@app/database/components/DatabaseViewSearch'
import DatabaseViewMainHeader from '@app/database/components/DatabaseViewMainHeader'
import DatabaseViewPreviewHeader from '@app/database/components/DatabaseViewPreviewHeader'

import Bindings, { BindingHandlers } from '@app/settings/components/Bindings'

import ItemNavigationStore from '@app/common/stores/ItemNavigationStore'

import PlaybackService from '@app/playback/services/PlaybackService'
import PlaylistService from '@app/playlist/services/PlaylistService'

import { dirname } from '@app/common/utils/path'
import { getFullMatchParamFromProps } from '@app/common/utils/router'

import DatabaseViewStore, { DATABASE_ROOT_URI } from './store'

import { DatabaseViewBindingName, ID as BINDINGS_ID } from './bindings'

import Route from './route'

import styles from './styles.scss'

@observer
class DatabaseView extends React.Component<RouteComponentProps> {
  state: {
    isKeyboardNavigationActive: boolean
    itemNavigationStoreMap: Record<string, ItemNavigationStore>
  } = { isKeyboardNavigationActive: false, itemNavigationStoreMap: {} }

  searchItemNavigationStore = new ItemNavigationStore()

  componentDidMount() {
    this.retrieveMain()
  }

  componentDidUpdate(prevProps: RouteChildrenProps) {
    const prevMatchUri = getFullMatchParamFromProps(Route.match.param, prevProps)

    if (!R.equals(prevMatchUri, this.currentMatchUri)) {
      this.retrieveMain()
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
      [DatabaseViewBindingName.ADD]: this.handleAddKeyPress,
      [DatabaseViewBindingName.PLAY]: this.handlePlayKeyPress,
      [DatabaseViewBindingName.SEARCH_FOCUS]: this.handleSearchFocusKeyPress,
      [DatabaseViewBindingName.SEARCH_CANCEL]: this.handleSearchCancellation,
    }
  }

  private get mainMouseMoveHandler(): React.EventHandler<React.MouseEvent> | undefined {
    if (this.state.isKeyboardNavigationActive) {
      return this.handleMainMouseMove
    }

    return undefined
  }

  private get isInRoot(): boolean {
    return R.isNil(this.currentMatchUri)
  }

  private get currentItem(): Nullable<DatabaseItemDto> {
    if (R.isNil(this.currentItemNavigationStore)) {
      return null
    }

    return DatabaseViewStore.mainItems[this.currentItemNavigationStore.currentItemIndex]
  }

  private get currentItemNavigationStore(): Nullable<ItemNavigationStore> {
    if (DatabaseViewStore.search.state !== SearchState.HIDDEN) {
      return this.searchItemNavigationStore
    }

    return this.state.itemNavigationStoreMap[DatabaseViewStore.main.uri]
  }

  private set currentItemNavigationStore(itemNavigationStore: Nullable<ItemNavigationStore>) {
    if (R.isNil(itemNavigationStore)) {
      return
    }

    const updater = R.set(
      R.lensPath([
        'itemNavigationStoreMap',
        DatabaseViewStore.main.uri
      ]),
      itemNavigationStore
    )

    this.setState(updater)
  }

  private get currentMatchUri(): Nullable<string> {
    return getFullMatchParamFromProps(Route.match.param, this.props)
  }

  private async retrieveMain() {
    const uri = this.currentMatchUri
      ?? DATABASE_ROOT_URI

    DatabaseViewStore.resetPreview()

    await DatabaseViewStore.retrieveMain(uri)

    DatabaseViewStore.resetSearch()

    if (R.isNil(this.currentItemNavigationStore)) {
      this.currentItemNavigationStore = new ItemNavigationStore(DatabaseViewStore.mainItems)
    }
  }

  private goTo(uri: string) {
    if (R.equals(uri, DATABASE_ROOT_URI)) {
      this.goToRoot()

      return
    }

    const path = `${Route.path}/${uri}`

    this.props.history.push(path)
  }

  private goToRoot() {
    if (this.isInRoot) {
      return
    }

    this.props.history.push(Route.path)
  }

  private goBack() {
    if (this.isInRoot) {
      return
    }

    if (R.isNil(this.currentMatchUri)) {
      return
    }

    const uri = dirname(this.currentMatchUri)

    this.goTo(uri)
  }

  private goForward() {
    this.props.history.goForward()
  }

  private async add(uri: string) {
    await PlaylistService.add(uri)
  }

  private async play(uri: string) {
    await PlaylistService.clear()
    await PlaylistService.add(uri)
    await PlaybackService.toggle()
  }

  private setKeyboardNavigationActive(isActive: boolean) {
    if (this.state.isKeyboardNavigationActive === isActive) {
      return
    }

    this.setState({ isKeyboardNavigationActive: isActive })
  }

  private isItemSelected = (index: Nullable<number>) => {
    return this.state.isKeyboardNavigationActive
      && R.equals(this.currentItemNavigationStore?.currentItemIndex, index)
  }

  private handleHomeClick = () => {
    this.setKeyboardNavigationActive(false)

    this.goToRoot()
  }

  private handleBackClick = () => {
    this.setKeyboardNavigationActive(false)

    this.goBack()
  }

  private handleForwardClick = () => {
    this.setKeyboardNavigationActive(false)

    this.goForward()
  }

  private handleItemClick = (uri: string) => () => {
    this.setKeyboardNavigationActive(false)

    this.goTo(uri)
  }

  private handleAddClick = (uri: string) => async () => {
    await this.add(uri)
  }

  private handlePlayClick = (uri: string) => async () => {
    await this.play(uri)
  }

  private handleItemMouseOver = (item: DatabaseItemDto) => async () => {
    await DatabaseViewStore.retrievePreview(item)
  }

  private handleNextItemKeyPress = throttle(() => {
    if (!this.state.isKeyboardNavigationActive) {
      this.setKeyboardNavigationActive(true)

      return
    }

    this.currentItemNavigationStore?.goToNextItem()
  }, 25)

  private handlePrevItemKeyPress = throttle(() => {
    if (!this.state.isKeyboardNavigationActive) {
      this.setKeyboardNavigationActive(true)

      return
    }

    this.currentItemNavigationStore?.goToPrevItem()
  }, 25)

  private handleFirstItemKeyPress = () => {
    this.setKeyboardNavigationActive(true)

    this.currentItemNavigationStore?.goToFirstItem()
  }

  private handleLastItemKeyPress = () => {
    this.setKeyboardNavigationActive(true)

    this.currentItemNavigationStore?.goToLastItem()
  }

  private handleDescendKeyPress = () => {
    if (!this.state.isKeyboardNavigationActive) {
      return
    }

    if (R.isNil(this.currentItem)) {
      return
    }

    this.goTo(this.currentItem.uri)
  }

  private handleAscendKeyPress = () => {
    this.goBack()
  }

  private handleAddKeyPress = () => {
    if (R.isNil(this.currentItem)) {
      return
    }

    this.add(this.currentItem.uri)
  }

  private handlePlayKeyPress = () => {
    if (R.isNil(this.currentItem)) {
      return
    }

    this.play(this.currentItem?.uri)
  }

  private handleSearchFocusKeyPress = (_: string, event: KeyboardEvent) => {
    event.preventDefault()

    this.setKeyboardNavigationActive(false)

    DatabaseViewStore.search.state = SearchState.FOCUSED
  }

  private handleSearchCancellation = () => {
    DatabaseViewStore.search.state = SearchState.HIDDEN

    this.setKeyboardNavigationActive(true)
  }

  private handleSearchChange = (value: string) => {
    DatabaseViewStore.setSearch(value)

    this.searchItemNavigationStore.setItems(DatabaseViewStore.mainItems)
  }

  private handleSearchCompletion = () => {
    DatabaseViewStore.search.state = SearchState.ACTIVE

    this.setKeyboardNavigationActive(true)

    this.currentItemNavigationStore?.goToFirstItem()
  }

  private handleMainMouseMove = (event: React.MouseEvent) => {
    if (event.movementX !== 0 || event.movementY !== 0) {
      this.setKeyboardNavigationActive(false)
    }
  }

  render() {
    const hasPreview = !R.isNil(DatabaseViewStore.preview.item)

    return (
      <div className={cx(styles.container, styles.row)}>
        <Bindings
          id={BINDINGS_ID}
          handlers={this.bindingHandlers}
        />
        <div className={cx(styles.container, styles.column, styles.split)}>
          <DatabaseViewMainHeader
            uri={DatabaseViewStore.main.uri}
            pathPrefix={Route.path}
            onHomeClick={this.handleHomeClick}
            onBackClick={this.handleBackClick}
            onForwardClick={this.handleForwardClick}
          />
          <If condition={DatabaseViewStore.search.state !== SearchState.HIDDEN}>
            <DatabaseViewSearch
              isFocused={DatabaseViewStore.search.state === SearchState.FOCUSED}
              value={DatabaseViewStore.search.value}
              onExit={this.handleSearchCancellation}
              onChange={this.handleSearchChange}
              onCompletion={this.handleSearchCompletion}
            />
          </If>
          <div className={styles.scrollable} onMouseMove={this.mainMouseMoveHandler}>
            <For of={DatabaseViewStore.mainItems} body={(item, index) => (
              <DatabaseItem
                key={item.uri}
                isSelected={this.isItemSelected(index)}
                isMouseDisabled={this.state.isKeyboardNavigationActive}
                item={item}
                onClick={this.handleItemClick(item.uri)}
                onMouseOver={this.handleItemMouseOver(item)}
                onAddClick={this.handleAddClick(item.uri)}
                onPlayClick={this.handlePlayClick(item.uri)}
              />
            )} />
          </div>
        </div>
        <div className={cx(styles.container, styles.column, styles.split)}>
          <Choose>
            <When condition={hasPreview}>
              <DatabaseViewPreviewHeader
                item={DatabaseViewStore.preview.item}
                count={DatabaseViewStore.preview.count}
              />
              <div className={styles.scrollable}>
                <For of={DatabaseViewStore.preview.items} body={(item) => (
                  <DatabaseItem
                    key={item.uri}
                    item={item}
                    onClick={this.handleItemClick(item.uri)}
                    onAddClick={this.handleAddClick(item.uri)}
                    onPlayClick={this.handlePlayClick(item.uri)}
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

export { Route }

export default withRouter(DatabaseView)
