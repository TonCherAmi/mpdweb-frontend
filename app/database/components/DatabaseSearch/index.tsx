import React, { useRef, useCallback, useState, useEffect, memo } from 'react'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'
import DatabaseItemData from '@app/database/data/DatabaseItem'

import DatabaseSearchInput from '@app/database/components/DatabaseSearchInput'
import DatabaseItem, { HighlightStyle } from '@app/database/components/DatabaseItem'

import useCache from '@app/common/use/useCache'
import useInput from '@app/common/use/useInput'
import useDebounce from '@app/common/use/useDebounce'
import useRemoteList from '@app/common/use/useRemoteList'
import useItemNavigation from '@app/common/use/useItemNavigation'
import useQueueActions from '@app/queue/use/useQueueActions'
import useRouteNavigation from '@app/common/use/useRouteNavigation'
import useItemListKeybindings from '@app/keybindings/use/useItemListKeybindings'
import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'
import useDatabaseItemHighlightStyle from '@app/database/use/useDatabaseItemHighlightStyle'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'
import useUiInteractionModeAwareWheelEventHandler from '@app/ui/use/useUiInteractionModeAwareWheelEventHandler'
import useUiInteractionModeAwareMouseEventHandler from '@app/ui/use/useUiInteractionModeAwareMouseEventHandler'

import { route as DatabaseViewRoute } from '@app/database/views/DatabaseView'

import DatabaseApi from '@app/database/api'

import usePositionedDatabaseItemRef from './use/usePositionedDatabaseItemRef'

import styles from './styles.scss'

const CACHE_ID = 'DatabaseSearch'

const MIN_SEARCH_TERM_LENGTH = 3

const SEARCH_DEBOUNCE_WAIT_MS = 350

const INITIAL_STATE: CachedState = {
  term: '',
  results: [],
  currentItem: null,
}

interface CachedState {
  term: string
  results: ReadonlyArray<DatabaseItemData>
  currentItem: Nullable<DatabaseItemData>
}

interface Props {
  onSuccess: Thunk
}

const DatabaseSearch = memo(({ onSuccess }: Props) => {
  const { reset, ...remote } = useRemoteList(DatabaseApi.search)

  const [load, cancel] = useDebounce((term: string) => {
    if (remote.state === 'fetching') {
      remote.cancel()
    }

    remote.load({ term })
  }, SEARCH_DEBOUNCE_WAIT_MS)

  const handleChange = useCallback((term: string) => {
    cancel()

    if (term.length < MIN_SEARCH_TERM_LENGTH) {
      if (remote.state !== 'initial') {
        reset()
      }

      return
    }

    load(term)
  }, [cancel, load, reset, remote.state])

  const cache = useCache(CACHE_ID, INITIAL_STATE)

  const input = useInput(cache.term, handleChange)

  useEffect(() => {
    if (!R.isEmpty(input.value)) {
      cache.term = input.value
    }
  }, [cache, input.value])

  useEffect(() => {
    if (remote.state === 'success') {
      cache.results = remote.items
    }
  }, [cache, remote.items, remote.state])

  const [isItemListFocusable, setIsItemListFocusable] = useState(false)

  const items = remote.state === 'initial' && input.value === cache.term
    ? cache.results
    : remote.items

  const itemNavigation = useItemNavigation(items)

  const { setCurrentItem, goToFirstItem } = itemNavigation

  useEffect(() => {
    if (!R.isNil(cache.currentItem)) {
      setCurrentItem(cache.currentItem)
    } else {
      goToFirstItem()
    }
  }, [cache, setCurrentItem, goToFirstItem])

  useEffect(() => {
    cache.currentItem = itemNavigation.currentItem
  }, [cache, itemNavigation.currentItem])

  const databaseItemRef = usePositionedDatabaseItemRef(itemNavigation.currentItem)

  const getDatabaseItemRef = (item: DatabaseItemData): Nullable<typeof databaseItemRef> => {
    if (item !== itemNavigation.currentItem) {
      return null
    }

    return databaseItemRef
  }

  const currentDatabaseItemHighlightStyle = useDatabaseItemHighlightStyle({
    isActive: true,
    isFocusable: isItemListFocusable,
  })

  const getDatabaseItemHighlightStyle = (item: DatabaseItemData): Nullable<HighlightStyle> => {
    if (item !== itemNavigation.currentItem) {
      return null
    }

    return currentDatabaseItemHighlightStyle
  }

  const navigateToDatabaseView = useRouteNavigation(DatabaseViewRoute)

  const handleDescent = useCallback((databaseItem: DatabaseItemData) => {
    onSuccess()

    navigateToDatabaseView(databaseItem.uri)
  }, [navigateToDatabaseView, onSuccess])

  const uiInteractionMode = useUiInteractionModeContext()

  const handleSearchBlur = () => {
    setIsItemListFocusable(true)
  }

  const handleSearchFocus = () => {
    setIsItemListFocusable(false)

    if (uiInteractionMode.isMouse) {
      uiInteractionMode.setKeyboard()
    }
  }

  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearchFocusKeyPress = () => {
    if (uiInteractionMode.isMouse) {
      uiInteractionMode.setKeyboard()
    }

    searchInputRef.current?.focus()
  }

  const handleSearchExit = () => {
    if (itemNavigation.isEmpty) {
      return
    }

    handleSearchCancel()
  }

  const handleSearchAccept = () => {
    if (R.isNil(itemNavigation.currentItem)) {
      return
    }

    handleDescent(itemNavigation.currentItem)
  }

  const handleSearchCancel = () => {
    searchInputRef.current?.blur()

    if (R.isEmpty(items)) {
      onSuccess()
    }

    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()
    }
  }

  const { add, replace } = useQueueActions()

  useFocusScopeGroupedKeybindings({
    ADD: () => {
      if (R.isNil(itemNavigation.currentItem)) {
        return
      }

      add(itemNavigation.currentItem)
    },
    PLAY: () => {
      if (R.isNil(itemNavigation.currentItem)) {
        return
      }

      replace(itemNavigation.currentItem)
    },
    SEARCH_FOCUS: handleSearchFocusKeyPress,
    NAVIGATE_RIGHT: () => {
      if (R.isNil(itemNavigation.currentItem)) {
        return
      }

      handleDescent(itemNavigation.currentItem)
    },
  })

  useItemListKeybindings(itemNavigation)

  const containerWheelHandler = useUiInteractionModeAwareWheelEventHandler()
  const containerMouseMoveHandler = useUiInteractionModeAwareMouseEventHandler()

  return (
    <div className={styles.container}>
      <DatabaseSearchInput
        autofocus
        ref={searchInputRef}
        value={input.value}
        onExit={handleSearchExit}
        onCancel={handleSearchCancel}
        onAccept={handleSearchAccept}
        onBlur={handleSearchBlur}
        onFocus={handleSearchFocus}
        onChange={input.handleChange}
      />
      <If condition={!R.isEmpty(items)}>
        <div
          className={styles.items}
          onWheel={containerWheelHandler}
          onMouseMove={containerMouseMoveHandler}
        >
          <For of={items} body={(item) => (
            <DatabaseItem
              key={item.uri}
              ref={getDatabaseItemRef(item)}
              item={item}
              highlightStyle={getDatabaseItemHighlightStyle(item)}
              onClick={handleDescent}
              onAddClick={add}
              onPlayClick={replace}
            />
          )} />
        </div>
      </If>
    </div>
  )
})

export default DatabaseSearch
