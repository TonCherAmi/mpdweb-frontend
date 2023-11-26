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
import useItemListNavigation from '@app/common/use/useItemListNavigation'
import useQueueActions from '@app/queue/use/useQueueActions'
import useRouteNavigation from '@app/common/use/useRouteNavigation'
import useDatabaseActions from '@app/database/use/useDatabaseActions'
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
  query: '',
  results: [],
  currentItem: null,
}

interface CachedState {
  query: string
  results: ReadonlyArray<DatabaseItemData>
  currentItem: Nullable<DatabaseItemData>
}

interface Props {
  onSuccess: Thunk
}

const DatabaseSearch = memo(({ onSuccess }: Props) => {
  const { reset, ...remote } = useRemoteList(DatabaseApi.search)

  const [load, cancel] = useDebounce((query: string) => {
    if (remote.state === 'fetching') {
      remote.cancel()
    }

    remote.load({ query })
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

  const input = useInput(cache.query, handleChange)

  useEffect(() => {
    if (!R.isEmpty(input.value)) {
      cache.query = input.value
    }
  }, [cache, input.value])

  useEffect(() => {
    if (remote.state === 'success') {
      cache.results = remote.items
    }
  }, [cache, remote.items, remote.state])

  const [isItemListFocusable, setIsItemListFocusable] = useState(false)

  const items = remote.state === 'initial' && input.value === cache.query
    ? cache.results
    : remote.items

  const itemListNavigation = useItemListNavigation(items)

  const { setCurrentItem, goToFirstItem } = itemListNavigation

  useEffect(() => {
    if (!R.isNil(cache.currentItem)) {
      setCurrentItem(cache.currentItem)
    } else {
      goToFirstItem()
    }
  }, [cache, setCurrentItem, goToFirstItem])

  useEffect(() => {
    cache.currentItem = itemListNavigation.currentItem
  }, [cache, itemListNavigation.currentItem])

  const itemRef = usePositionedDatabaseItemRef(itemListNavigation.currentItem)

  const getDatabaseItemRef = (item: DatabaseItemData): Nullable<typeof itemRef> => {
    if (item !== itemListNavigation.currentItem) {
      return null
    }

    return itemRef
  }

  const currentDatabaseItemHighlightStyle = useDatabaseItemHighlightStyle({
    isActive: true,
    isFocusable: isItemListFocusable,
  })

  const getDatabaseItemHighlightStyle = (item: DatabaseItemData): Nullable<HighlightStyle> => {
    if (item !== itemListNavigation.currentItem) {
      return null
    }

    return currentDatabaseItemHighlightStyle
  }

  const navigateToDatabaseView = useRouteNavigation(DatabaseViewRoute)

  const handleDescent = useCallback((item: DatabaseItemData) => {
    onSuccess()

    navigateToDatabaseView(item.uri)
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

  const handleDescentKeyPress = () => {
    if (R.isNil(itemListNavigation.currentItem)) {
      return
    }

    handleDescent(itemListNavigation.currentItem)
  }

  const handleSearchExit = () => {
    if (itemListNavigation.isEmpty) {
      return
    }

    handleSearchCancel()
  }

  const handleSearchAccept = () => {
    if (R.isNil(itemListNavigation.currentItem)) {
      return
    }

    handleDescent(itemListNavigation.currentItem)
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

  const { update } = useDatabaseActions()
  const { add, replace } = useQueueActions()

  const handleAdd = useCallback((item: DatabaseItemData) => {
    add([item])
  }, [add])

  const handleReplace = useCallback((item: DatabaseItemData) => {
    replace([item])
  }, [replace])

  useFocusScopeGroupedKeybindings({
    ADD: () => {
      if (R.isNil(itemListNavigation.currentItem)) {
        return
      }

      add([itemListNavigation.currentItem])
    },
    PLAY: () => {
      if (R.isNil(itemListNavigation.currentItem)) {
        return
      }

      replace([itemListNavigation.currentItem])
    },
    SEARCH_FOCUS: handleSearchFocusKeyPress,
    ENTER: handleDescentKeyPress,
    NAVIGATE_RIGHT: handleDescentKeyPress,
    DATABASE_UPDATE_AT_POINT: () => {
      if (R.isNil(itemListNavigation.currentItem)) {
        return
      }

      update(itemListNavigation.currentItem.uri)
    },
  })

  useItemListKeybindings(itemListNavigation)

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
              onAddClick={handleAdd}
              onPlayClick={handleReplace}
            />
          )} />
        </div>
      </If>
    </div>
  )
})

export default DatabaseSearch
