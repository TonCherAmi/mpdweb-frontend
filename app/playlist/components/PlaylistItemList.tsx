import React, { useCallback, memo } from 'react'

import PlaylistItemData from '@app/playlist/data/PlaylistItem'

import PlaylistItem from '@app/playlist/components/PlaylistItem'

import PlaybackService from '@app/playback/services/PlaybackService'

interface Props {
  items: ReadonlyArray<PlaylistItemData>
}

const PlaylistItemList = memo(({ items }: Props) => {
  const handleItemClick = useCallback((item: PlaylistItemData) => {
    PlaybackService.play(item.id)
  }, [])

  return (
    <For of={items} body={(item) => (
      <PlaylistItem
        key={item.id}
        item={item}
        onClick={handleItemClick}
      />
    )} />
  )
})

export default PlaylistItemList
