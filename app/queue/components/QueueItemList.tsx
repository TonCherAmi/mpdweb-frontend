import React, { useCallback, memo } from 'react'

import QueueItemData from '@app/queue/data/QueueItem'

import QueueItem from '@app/queue/components/QueueItem'

import PlaybackService from '@app/playback/services/PlaybackService'

interface Props {
  items: ReadonlyArray<QueueItemData>
}

const QueueItemList = memo(({ items }: Props) => {
  const handleItemClick = useCallback((item: QueueItemData) => {
    PlaybackService.play(item.id)
  }, [])

  return (
    <For of={items} body={(item) => (
      <QueueItem
        key={item.id}
        item={item}
        onClick={handleItemClick}
      />
    )} />
  )
})

export default QueueItemList
