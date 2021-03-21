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

import ItemNavigationStore from '@app/common/stores/ItemNavigationStore'

import { dirname } from '@app/common/utils/path'
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

  searchItemNavigationStore: Nullable<ItemNavigationStore> = null

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
      [CommonBindingName.SEARCH_FOCUS]: this.handleSearchFocusKeyPress,
      [CommonBindingName.SEARCH_CANCEL]: this.handleSearchCancellation
    }
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

    this.searchItemNavigationStore = null

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

  private setKeyboardNavigationActive(isActive: boolean) {
    if (this.state.isKeyboardNavigationActive === isActive) {
      return
    }

    this.setState({ isKeyboardNavigationActive: isActive })
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

  private handleSearchFocusKeyPress = (_: string, event: KeyboardEvent) => {
    event.preventDefault()

    if (R.isNil(this.searchItemNavigationStore)) {
      this.searchItemNavigationStore = new ItemNavigationStore(DatabaseViewStore.mainItems)
    }

    this.setKeyboardNavigationActive(true)

    DatabaseViewStore.search.state = SearchState.FOCUSED
  }

  private handleSearchCancellation = () => {
    DatabaseViewStore.search.state = SearchState.HIDDEN

    this.setKeyboardNavigationActive(true)
  }

  private handleSearchChange = (value: string) => {
    DatabaseViewStore.setSearch(value)

    this.searchItemNavigationStore?.setItems(DatabaseViewStore.mainItems)
  }

  private handleSearchDescent = () => {
    if (this.currentItemNavigationStore?.isEmpty) {
      return
    }

    if (R.isNil(this.currentItem)) {
      return
    }

    this.setKeyboardNavigationActive(true)

    this.goTo(this.currentItem?.uri)
  }

  private handleSearchCompletion = () => {
    if (this.currentItemNavigationStore?.isEmpty) {
      return
    }

    DatabaseViewStore.search.state = SearchState.ACTIVE

    this.setKeyboardNavigationActive(true)
  }

  render() {
    return (
      <DatabaseItemListWithPreview
        areItemsFocusable={DatabaseViewStore.search.state !== SearchState.FOCUSED}
        items={DatabaseViewStore.mainItems}
        itemNavigationStore={this.currentItemNavigationStore}
        onAscent={() => this.goBack()}
        onDescent={(item) => this.goTo(item.uri)}
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
            value={DatabaseViewStore.search.value}
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
