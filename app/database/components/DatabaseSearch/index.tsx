import React, { useRef, useCallback, useState, useEffect, MutableRefObject, memo } from 'react'

import * as R from 'ramda'

import Thunk from '@app/common/types/Thunk'

import useInput from '@app/common/use/useInput'
import useDebounce from '@app/common/use/useDebounce'
import useRemoteList from '@app/common/use/useRemoteList'
import useKeybindings from '@app/keybindings/use/useKeybindings'
import useItemNavigation from '@app/common/use/useItemNavigation'
import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'
import useItemListKeybindings from '@app/keybindings/use/useItemListKeybindings'
import useDatabaseItemActions from '@app/database/components/use/useDatabaseItemActions'
import useRouteNavigation from '@app/common/use/useRouteNavigation'
import useDatabaseItemHighlightStyle from '@app/database/components/use/useDatabaseItemHighlightStyle'
import useUiInteractionModeAwareWheelEventHandler from '@app/ui/use/useUiInteractionModeAwareWheelEventHandler'
import useUiInteractionModeAwareMouseEventHandler from '@app/ui/use/useUiInteractionModeAwareMouseEventHandler'

import SearchInput from '@app/common/components/SearchInput'
import DatabaseItem, { HighlightStyle } from '@app/database/components/DatabaseItem'

import DatabaseItemDto from '@app/database/dto/DatabaseItem'

import { route as DatabaseViewRoute } from '@app/database/views/DatabaseView'

import DatabaseApi from '@app/database/api'

import usePositionedDatabaseItemRef from './use/usePositionedDatabaseItemRef'

import styles from './styles.scss'

const MIN_SEARCH_TERM_LENGTH = 3

const SEARCH_DEBOUNCE_WAIT_MS = 350

interface PreservedState {
  term: string
  results: ReadonlyArray<DatabaseItemDto>
  currentItem: Nullable<DatabaseItemDto>
}

interface Props {
  preservedStateRef: MutableRefObject<PreservedState>
  onSuccess: Thunk
}

const DatabaseSearch = memo(({ preservedStateRef, onSuccess }: Props) => {
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

  const input = useInput(preservedStateRef.current.term, handleChange)

  useEffect(() => {
    if (!R.isEmpty(input.value)) {
      preservedStateRef.current.term = input.value
    }
  }, [preservedStateRef, input.value])

  useEffect(() => {
    if (remote.state === 'success') {
      preservedStateRef.current.results = remote.items
    }
  }, [preservedStateRef, remote.items, remote.state])

  const [isItemListFocusable, setIsItemListFocusable] = useState(false)

  const items = remote.state === 'initial'
    ? preservedStateRef.current.results
    : remote.items

  const itemNavigation = useItemNavigation(items)

  const { setCurrentItem, goToFirstItem } = itemNavigation

  useEffect(() => {
    if (!R.isNil(preservedStateRef.current.currentItem)) {
      setCurrentItem(preservedStateRef.current.currentItem)
    } else {
      goToFirstItem()
    }
  }, [preservedStateRef, setCurrentItem, goToFirstItem])

  useEffect(() => {
    preservedStateRef.current.currentItem = itemNavigation.currentItem
  }, [preservedStateRef, itemNavigation.currentItem])

  const databaseItemRef = usePositionedDatabaseItemRef(itemNavigation.currentItem)

  const getDatabaseItemRef = (item: DatabaseItemDto): Nullable<typeof databaseItemRef> => {
    if (item !== itemNavigation.currentItem) {
      return null
    }

    return databaseItemRef
  }

  const currentDatabaseItemHighlightStyle = useDatabaseItemHighlightStyle({
    isActive: true,
    isFocusable: isItemListFocusable
  })

  const getDatabaseItemHighlightStyle = (item: DatabaseItemDto): Nullable<HighlightStyle> => {
    if (item !== itemNavigation.currentItem) {
      return null
    }

    return currentDatabaseItemHighlightStyle
  }

  const navigateToDatabaseView = useRouteNavigation(DatabaseViewRoute)

  const handleDescent = useCallback((databaseItem: DatabaseItemDto) => {
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

    if (!uiInteractionMode.isKeyboard) {
      uiInteractionMode.setKeyboard()
    }
  }

  const { add, play } = useDatabaseItemActions()

  useKeybindings({
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

      play(itemNavigation.currentItem)
    },
    SEARCH_FOCUS: handleSearchFocusKeyPress,
    NAVIGATE_RIGHT: () => {
      if (R.isNil(itemNavigation.currentItem)) {
        return
      }

      handleDescent(itemNavigation.currentItem)
    }
  })

  useItemListKeybindings(itemNavigation)

  const containerWheelHandler = useUiInteractionModeAwareWheelEventHandler()
  const containerMouseMoveHandler = useUiInteractionModeAwareMouseEventHandler()

  return (
    <div className={styles.container}>
      <SearchInput
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
            onPlayClick={play}
          />
        )} />
      </div>
    </div>
  )
})

export default DatabaseSearch
