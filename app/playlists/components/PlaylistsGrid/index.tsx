import React, { useRef } from 'react'

import * as R from 'ramda'

import Playlist from '@app/playlists/data/Playlist'

import PlaylistsGridItem from '@app/playlists/components/PlaylistsGridItem'

import usePlaylistActions from '@app/playlists/use/usePlaylistActions'
import useItemGridNavigation from '@app/common/use/useItemGridNavigation'
import useItemGridKeybindings from '@app/keybindings/use/useItemGridKeybindings'

import styles from './styles.scss'

interface Props {
  items: ReadonlyArray<Playlist>
}

const PlaylistsGrid = (props: Props) => {
  const itemGridNavigation = useItemGridNavigation(props.items)

  const gridRef = useRef<HTMLDivElement>(null)

  const calculateRowLength = (): number => {
    if (!gridRef.current || R.isEmpty(props.items)) {
      return 0
    }

    const gridElements = Array.from(gridRef.current.children)

    const topRowElement = R.head(gridElements) as Nullable<HTMLElement>

    if (R.isNil(topRowElement)) {
      return 0
    }

    const topRowOffset = topRowElement.offsetTop

    const secondRowElementIndex = gridElements.findIndex((element) => (
      (element as HTMLElement).offsetTop > topRowOffset
    ))

    return secondRowElementIndex === -1 ? props.items.length : secondRowElementIndex
  }

  useItemGridKeybindings(itemGridNavigation, {
    calculateRowLength,
  })

  const { remove } = usePlaylistActions()

  return (
    <div ref={gridRef} className={styles.container}>
      <For of={props.items} body={(item) => (
        <PlaylistsGridItem
          isSelected={item === itemGridNavigation.currentItem}
          playlist={item}
          onRemoveClick={remove}
        />
      )} />
    </div>
  )
}

export default PlaylistsGrid
