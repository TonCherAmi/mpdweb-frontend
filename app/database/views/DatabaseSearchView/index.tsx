import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router'

import { observer } from 'mobx-react'

import debounce from 'lodash.debounce'

import { CommonBindingName } from '@app/common/bindings'

import SearchState from '@app/common/dto/enums/SearchState'
import DatabaseItem from '@app/database/dto/DatabaseItem'

import { Route as DatabaseViewRoute } from '@app/database/views/DatabaseView'

import DatabaseSearch from '@app/database/components/DatabaseSearch'
import DatabaseItemListWithPreview from '@app/database/components/DatabaseItemListWithPreview'
import DatabaseSearchViewItemsPlaceholder from '@app/database/components/DatabaseSearchViewItemsPlaceholder'

import Bindings, { BindingHandlers } from '@app/settings/components/Bindings'
import SearchStateStore from '@app/common/stores/SearchStateStore'
import ItemNavigationStore from '@app/common/stores/ItemNavigationStore'

import DatabaseSearchViewStore from './store'

import Route from './route'

import styles from './styles.scss'

const MIN_SEARCH_TERM_LENGTH = 3

const SEARCH_DEBOUNCE_WAIT_MS = 350

@observer
class DatabaseSearchView extends React.Component<RouteComponentProps> {
  state: {
    isKeyboardNavigationActive: boolean
  } = { isKeyboardNavigationActive: true }

  private searchStateStore: SearchStateStore = new SearchStateStore(SearchState.FOCUSED)

  private itemNavigationStore: ItemNavigationStore = new ItemNavigationStore(DatabaseSearchViewStore.items)

  private get items(): DatabaseItem[] {
    return DatabaseSearchViewStore.data ?? []
  }

  private get bindingHandlers(): BindingHandlers {
    return {
      [CommonBindingName.SEARCH_FOCUS]: this.handleSearchFocusKeyPress
    }
  }

  private goTo(item: DatabaseItem) {
    const path = `${DatabaseViewRoute.path}/${item.uri}`

    this.props.history.push(path)
  }

  private setKeyboardNavigationActive(isActive: boolean) {
    this.setState({ isKeyboardNavigationActive: isActive })
  }

  private activateKeyboardNavigation() {
    this.setKeyboardNavigationActive(true)
  }

  private deactivateKeyboardNavigation() {
    this.setKeyboardNavigationActive(false)
  }

  private cancelCurrentSearch() {
    DatabaseSearchViewStore.cancel?.()
  }

  private searchDebounced = debounce(async (term) => {
    if (term.length < MIN_SEARCH_TERM_LENGTH) {
      return
    }

    await DatabaseSearchViewStore.search(term)

    this.itemNavigationStore.reset(DatabaseSearchViewStore.items)
  }, SEARCH_DEBOUNCE_WAIT_MS)

  private setSearchInput(value: string) {
    DatabaseSearchViewStore.input = value
  }

  private handleDescent = (item: DatabaseItem) => {
    this.goTo(item)
  }

  private handleKeyboardNavigationActivation = () => {
    this.activateKeyboardNavigation()
  }

  private handleKeyboardNavigationDeactivation = () => {
    this.deactivateKeyboardNavigation()
  }

  private handleSearchFocusKeyPress = (_: string, event: KeyboardEvent) => {
    event.preventDefault()

    this.activateKeyboardNavigation()

    this.searchStateStore.focus()
  }

  private handleSearchExit = () => {
    this.searchStateStore.deactivate()

    this.activateKeyboardNavigation()
  }

  private handleSearchChange = async (value) => {
    this.setSearchInput(value)

    this.cancelCurrentSearch()

    this.searchDebounced(value)
  }

  private handleSearchCompletion = () => {
    if (this.itemNavigationStore.isEmpty) {
      return
    }

    this.searchStateStore.unfocus()

    this.activateKeyboardNavigation()
  }

  private handleSearchDescent = () => {
    this.handleDescent(
      this.items[this.itemNavigationStore.currentItemIndex]
    )
  }

  private renderPlaceholder = () => {
    return (
      <DatabaseSearchViewItemsPlaceholder
        state={DatabaseSearchViewStore.state}
        term={DatabaseSearchViewStore.input}
        minTermLength={MIN_SEARCH_TERM_LENGTH}
        items={DatabaseSearchViewStore.items}
      />
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <DatabaseItemListWithPreview
          isFocusable={!this.searchStateStore.isFocused}
          isKeyboardNavigationActive={this.state.isKeyboardNavigationActive}
          items={DatabaseSearchViewStore.items}
          itemNavigationStore={this.itemNavigationStore}
          renderPlaceholder={this.renderPlaceholder}
          onDescent={this.handleDescent}
          onKeyboardNavigationActivation={this.handleKeyboardNavigationActivation}
          onKeyboardNavigationDeactivation={this.handleKeyboardNavigationDeactivation}
        >
          <Bindings
            id={DatabaseSearchView.name}
            handlers={this.bindingHandlers}
          />
          <DatabaseSearch
            isFocused={this.searchStateStore.isFocused}
            value={DatabaseSearchViewStore.input}
            onExit={this.handleSearchExit}
            onChange={this.handleSearchChange}
            onDescent={this.handleSearchDescent}
            onCompletion={this.handleSearchCompletion}
          />
        </DatabaseItemListWithPreview>
      </div>
    )
  }
}

export { Route }

export default withRouter(DatabaseSearchView)
