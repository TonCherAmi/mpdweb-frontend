import React from 'react'

import {
  withRouter,
  RouteChildrenProps,
  RouteComponentProps
} from 'react-router'

import { observer } from 'mobx-react'

import * as R from 'ramda'

import { CommonBindingName } from '@app/common/bindings'

import SearchState from '@app/common/dto/enums/SearchState'
import DatabaseItemDto from '@app/database/dto/DatabaseItem'

import DatabaseViewSearch from '@app/database/components/DatabaseViewSearch'
import DatabaseViewMainHeader from '@app/database/components/DatabaseViewMainHeader'
import DatabaseItemListWithPreview from '@app/database/components/DatabaseItemListWithPreview'

import Bindings, { BindingHandlers } from '@app/settings/components/Bindings'

import SearchStore from '@app/common/stores/SearchStore'
import ItemNavigationStore from '@app/common/stores/ItemNavigationStore'

import { dirname, basename } from '@app/common/utils/path'
import { getFullMatchParamFromProps } from '@app/common/utils/router'

import DatabaseViewStore, { DATABASE_ROOT_URI } from './store'

import { ID as BINDINGS_ID } from './bindings'

import Route from './route'

@observer
class DatabaseView extends React.Component<RouteComponentProps> {
  state: {
    isKeyboardNavigationActive: boolean
    itemNavigationStoreMap: Record<string, ItemNavigationStore>
  } = { isKeyboardNavigationActive: false, itemNavigationStoreMap: {} }

  searchStore: SearchStore<DatabaseItemDto> = new SearchStore([], ['uri'], basename)

  searchItemNavigationStore: Nullable<ItemNavigationStore> = null

  componentDidMount() {
    this.retrieve()
  }

  componentDidUpdate(prevProps: RouteChildrenProps) {
    const prevMatchUri = getFullMatchParamFromProps(Route.match.param, prevProps)

    if (!R.equals(prevMatchUri, this.currentMatchUri)) {
      this.retrieve()
    }
  }

  private get bindingHandlers(): BindingHandlers {
    return {
      [CommonBindingName.SEARCH_FOCUS]: this.handleSearchFocusKeyPress,
      [CommonBindingName.SEARCH_CANCEL]: this.handleSearchCancellation
    }
  }

  private get isInRoot(): boolean {
    return R.isNil(this.currentMatchUri)
  }

  private get items(): DatabaseItemDto[] {
    if (DatabaseViewStore.search.state !== SearchState.HIDDEN) {
      return this.searchStore.items
    }

    return DatabaseViewStore.items
  }

  private get currentItem(): Nullable<DatabaseItemDto> {
    if (R.isNil(this.currentItemNavigationStore)) {
      return null
    }

    return DatabaseViewStore.items[this.currentItemNavigationStore.currentItemIndex]
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

  private async retrieve() {
    const uri = this.currentMatchUri
      ?? DATABASE_ROOT_URI

    await DatabaseViewStore.retrieve(uri)

    DatabaseViewStore.resetSearch()

    this.searchStore.reset(DatabaseViewStore.items)

    this.searchItemNavigationStore = null

    if (R.isNil(this.currentItemNavigationStore)) {
      this.currentItemNavigationStore = new ItemNavigationStore(DatabaseViewStore.items)
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

  private setKeyboardNavigationActive(isActive: boolean) {
    if (this.state.isKeyboardNavigationActive === isActive) {
      return
    }

    this.setState({ isKeyboardNavigationActive: isActive })
  }

  private activateKeyboardNavigation() {
    this.setKeyboardNavigationActive(true)
  }

  private deactivateKeyboardNavigation() {
    this.setKeyboardNavigationActive(false)
  }

  private handleHomeClick = () => {
    this.goToRoot()
  }

  private handleBackClick = () => {
    this.goBack()
  }

  private handleForwardClick = () => {
    this.goForward()
  }

  private handleAscent = () => {
    this.goBack()
  }

  private handleDescent = (item: DatabaseItemDto) => {
    this.goTo(item.uri)
  }

  private handleKeyboardNavigationActivation = () => {
    this.activateKeyboardNavigation()
  }

  private handleKeyboardNavigationDeactivation = () => {
    this.deactivateKeyboardNavigation()
  }

  private handleSearchFocusKeyPress = (_: string, event: KeyboardEvent) => {
    event.preventDefault()

    if (R.isNil(this.searchItemNavigationStore)) {
      this.searchItemNavigationStore = new ItemNavigationStore(DatabaseViewStore.items)
    }

    this.activateKeyboardNavigation()

    DatabaseViewStore.search.state = SearchState.FOCUSED
  }

  private handleSearchCancellation = () => {
    DatabaseViewStore.search.state = SearchState.HIDDEN

    this.activateKeyboardNavigation()
  }

  private handleSearchChange = (value: string) => {
    this.searchStore.search(value)

    this.searchItemNavigationStore?.setItems(this.searchStore.items)
  }

  private handleSearchDescent = () => {
    if (this.currentItemNavigationStore?.isEmpty) {
      return
    }

    if (R.isNil(this.currentItem)) {
      return
    }

    this.activateKeyboardNavigation()

    this.goTo(this.currentItem?.uri)
  }

  private handleSearchCompletion = () => {
    if (this.currentItemNavigationStore?.isEmpty) {
      return
    }

    DatabaseViewStore.search.state = SearchState.ACTIVE

    this.activateKeyboardNavigation()
  }

  render() {
    return (
      <DatabaseItemListWithPreview
        areItemsFocusable={DatabaseViewStore.search.state !== SearchState.FOCUSED}
        isKeyboardNavigationActive={this.state.isKeyboardNavigationActive}
        items={this.items}
        itemNavigationStore={this.currentItemNavigationStore}
        onAscent={this.handleAscent}
        onDescent={this.handleDescent}
        onKeyboardNavigationActivation={this.handleKeyboardNavigationActivation}
        onKeyboardNavigationDeactivation={this.handleKeyboardNavigationDeactivation}
      >
        <Bindings
          id={BINDINGS_ID}
          handlers={this.bindingHandlers}
        />
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
            value={this.searchStore.input.value}
            onExit={this.handleSearchCancellation}
            onChange={this.handleSearchChange}
            onDescent={this.handleSearchDescent}
            onCompletion={this.handleSearchCompletion}
          />
        </If>
      </DatabaseItemListWithPreview>
    )
  }
}

export { Route }

export default withRouter(DatabaseView)
