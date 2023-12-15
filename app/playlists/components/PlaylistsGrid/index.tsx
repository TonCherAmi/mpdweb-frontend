import React, { useRef } from 'react'

import * as R from 'ramda'

import Playlist from '@app/playlists/data/Playlist'

import PlaylistsGridItem from '@app/playlists/components/PlaylistsGridItem'

import usePlaylistActions from '@app/playlists/use/usePlaylistActions'
import useFocusScopeContext from '@app/ui/use/useFocusScopeContext'
import useItemGridNavigation from '@app/common/use/useItemGridNavigation'
import useItemGridKeybindings from '@app/keybindings/use/useItemGridKeybindings'
import useFocusScopeGroupContext from '@app/ui/use/useFocusScopeGroupContext'
import usePlaylistsViewNavigation from '@app/playlists/views/PlaylistsView/use/usePlaylistsViewNavigation'
import useFocusScopeGroupedKeybindings from '@app/keybindings/use/useFocusScopeGroupedKeybindings'

import { calculateRowLength } from './utils'

import styles from './styles.scss'

interface Props {
  items: ReadonlyArray<Playlist>
}

const PlaylistsGrid = (props: Props) => {
  const itemGridNavigation = useItemGridNavigation(props.items)

  const gridRef = useRef<HTMLDivElement>(null)

  const { goTo } = usePlaylistsViewNavigation()

  const getRowLength = (): number => {
    if (!gridRef.current) {
      return 0
    }

    return calculateRowLength(gridRef.current, props.items)
  }

  useItemGridKeybindings(itemGridNavigation, {
    getRowLength,
  })

  useFocusScopeGroupedKeybindings({
    ENTER: () => {
      if (R.isNil(itemGridNavigation.currentItem)) {
        return
      }

      goTo(itemGridNavigation.currentItem.name)
    },
  })

  const { remove } = usePlaylistActions()

  const [focusScope] = useFocusScopeContext()

  const focusScopeGroup = useFocusScopeGroupContext()

  return (
    <div ref={gridRef} className={styles.container}>
      <For of={props.items} body={(item) => {
        const isSelected = item === itemGridNavigation.currentItem
          && focusScope === focusScopeGroup

        return (
          <PlaylistsGridItem
            isSelected={isSelected}
            playlist={item}
            onRemoveClick={remove}
          />
        )
      }} />
    </div>
  )
}

export default PlaylistsGrid
