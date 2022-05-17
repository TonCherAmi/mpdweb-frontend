import React, { useRef, useEffect, useState, useLayoutEffect, useCallback, memo } from 'react'

import * as R from 'ramda'

import Handler from '@app/common/types/Handler'

import DatabaseItemDto from '@app/database/dto/DatabaseItem'

import DatabaseItem, { HighlightStyle } from '@app/database/components/DatabaseItem'
import DatabaseDirectorySearchInput from '@app/database/components/DatabaseDirectorySearchInput'

import useItemSearch from '@app/common/use/useItemSearch'
import useItemNavigation from '@app/common/use/useItemNavigation'
import useModalStateContext from '@app/ui/use/useModalStateContext'
import useUiInteractionModeContext from '@app/ui/use/useUiInteractionModeContext'
import useKeybindings from '@app/keybindings/use/useKeybindings'
import useItemListKeybindings from '@app/keybindings/use/useItemListKeybindings'
import useDatabaseItemActions from '@app/database/components/use/useDatabaseItemActions'
import useDatabaseItemHighlightStyle from '@app/database/components/use/useDatabaseItemHighlightStyle'

import usePositionedDatabaseItemRef from './use/usePositionedDatabaseItemRef'

import styles from './styles.scss'

interface Props {
  isActive: boolean
  items: ReadonlyArray<DatabaseItemDto>
  selectedItem: DatabaseItemDto
  onAscent: Handler<DatabaseItemDto>
  onDescent: Handler<DatabaseItemDto>
}

const databaseItemUriAccessor = R.prop('uri')

const DatabaseDirectory = memo(({
  isActive,
  items,
  selectedItem,
  onAscent,
  onDescent
}: Props) => {
  const [isSearchHidden, setIsSearchHidden] = useState(true)
  const [isItemListFocusable, setIsItemListFocusable] = useState(true)

  useEffect(() => {
    if (!isActive) {
      setIsSearchHidden(true)
    }
  }, [isActive])

  useEffect(() => {
    if (isSearchHidden) {
      setIsItemListFocusable(true)
    }
  }, [isSearchHidden])

  const itemSearch = useItemSearch(items, databaseItemUriAccessor)

  const itemNavigation = useItemNavigation(items)

  const searchItemNavigation = useItemNavigation(itemSearch.results)

  const currentItemNavigation = isSearchHidden ? itemNavigation : searchItemNavigation

  const currentItem = R.defaultTo(selectedItem, currentItemNavigation.currentItem)

  const { setCurrentItem } = itemNavigation

  useLayoutEffect(() => {
    setCurrentItem(selectedItem)
  }, [selectedItem, setCurrentItem])

  const { goToFirstItem: goToFirstSearchItem } = searchItemNavigation

  useLayoutEffect(() => {
    goToFirstSearchItem()
  }, [goToFirstSearchItem, itemSearch.results])

  const databaseItemRef = usePositionedDatabaseItemRef(currentItem, {
    isActive,
    isSearchHidden
  })

  const getDatabaseItemRef = (item: DatabaseItemDto): Nullable<typeof databaseItemRef> => {
    if (item !== currentItem) {
      return null
    }

    return databaseItemRef
  }

  const currentDatabaseItemHighlightStyle = useDatabaseItemHighlightStyle({
    isActive,
    isFocusable: isItemListFocusable
  })

  const [modalState] = useModalStateContext()

  const getDatabaseItemHighlightStyle = (item: DatabaseItemDto): Nullable<HighlightStyle> => {
    if (!R.isNil(modalState) || item !== currentItemNavigation.currentItem) {
      return null
    }

    return currentDatabaseItemHighlightStyle
  }

  const handleDescent = () => {
    onDescent(currentItem)
  }

  const uiInteractionMode = useUiInteractionModeContext()

  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearchFocusKeyPress = () => {
    if (uiInteractionMode.isMouse) {
      uiInteractionMode.setKeyboard()
    }

    if (isSearchHidden) {
      setIsSearchHidden(false)

      return
    }

    searchInputRef.current?.focus()
  }

  const handleSearchExit = () => {
    if (currentItemNavigation.isEmpty) {
      return
    }

    searchInputRef.current?.blur()
  }

  const handleSearchCancel = () => {
    if (!R.isEmpty(itemSearch.input.value && !searchItemNavigation.isEmpty)) {
      itemNavigation.setCurrentItem(currentItem)
    }

    setIsSearchHidden(true)
  }

  const handleSearchBlur = useCallback(() => {
    setIsItemListFocusable(true)
  }, [])

  const handleSearchFocus = useCallback(() => setIsItemListFocusable(false), [])

  const { add, replace } = useDatabaseItemActions()

  useKeybindings({
    ADD: () => add(currentItem),
    PLAY: () => replace(currentItem),
    SEARCH_FOCUS: handleSearchFocusKeyPress,
    SEARCH_CANCEL: handleSearchCancel,
    NAVIGATE_LEFT: () => {
      if (R.isNil(currentItemNavigation.currentItem)) {
        return
      }

      onAscent(currentItemNavigation.currentItem)
    },
    NAVIGATE_RIGHT: () => {
      if (R.isNil(currentItemNavigation.currentItem)) {
        return
      }

      if (currentItemNavigation.currentItem.type !== 'DIRECTORY') {
        return
      }

      onDescent(currentItemNavigation.currentItem)
    }
  }, { disable: !isActive })

  useItemListKeybindings(currentItemNavigation, {
    disable: !isActive
  })

  const currentItems = isSearchHidden ? items : itemSearch.results

  return (
    <div className={styles.container}>
      <If condition={!isSearchHidden}>
        <DatabaseDirectorySearchInput
          autofocus
          ref={searchInputRef}
          value={itemSearch.input.value}
          onExit={handleSearchExit}
          onCancel={handleSearchCancel}
          onAccept={handleDescent}
          onBlur={handleSearchBlur}
          onFocus={handleSearchFocus}
          onChange={itemSearch.input.handleChange}
        />
      </If>
      <div className={styles.scrollable}>
        <For of={currentItems} body={(item) => (
          <DatabaseItem
            key={item.uri}
            ref={getDatabaseItemRef(item)}
            item={item}
            highlightStyle={getDatabaseItemHighlightStyle(item)}
            onClick={onDescent}
            onAddClick={add}
            onPlayClick={replace}
          />
        )} />
      </div>
    </div>
  )
})

export default DatabaseDirectory
