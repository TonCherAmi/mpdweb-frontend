import React, { useCallback, memo } from 'react'

import QueueItemData from '@app/queue/data/QueueItem'

import QueueItem from '@app/queue/components/QueueItem'

import PlaybackService from '@app/playback/services/PlaybackService'

import styles from './styles.scss'

interface Props {
  items: ReadonlyArray<QueueItemData>
}

const QueueItemList = memo(({ items }: Props) => {

  return (
    <div className={styles.container}>
      <For of={items} body={(item) => (
        <QueueItem
          key={item.id}
          item={item}
          onClick={PlaybackService.play}
        />
      )} />
    </div>
  )
})

export default QueueItemList
