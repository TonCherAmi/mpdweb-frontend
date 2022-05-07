import React, { useCallback, memo } from 'react'

import PlaylistItemDto from '@app/playlist/dto/PlaylistItem'

import PlaylistItem from '@app/playlist/components/PlaylistItem'

import PlaybackService from '@app/playback/services/PlaybackService'

interface Props {
  items: ReadonlyArray<PlaylistItemDto>
}

const PlaylistItemList = memo(({ items }: Props) => {
  const handleItemClick = useCallback((item: PlaylistItemDto) => {
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
