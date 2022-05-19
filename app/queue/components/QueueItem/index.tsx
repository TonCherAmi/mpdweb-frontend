import React, { memo } from 'react'

import Handler from '@app/common/types/Handler'
import QueueItemData from '@app/queue/data/QueueItem'

import Duration from '@app/common/components/Duration'
import DatabaseCoverArt from '@app/database/components/DatabaseCoverArt'

import useQueueItemContextMenu from '@app/queue/use/useQueueItemContextMenu'

import { formatAudioFormat, formatAudioFormatTitle } from './utils'

import styles from './styles.scss'

interface Props {
  item: QueueItemData
  onClick?: Handler<QueueItemData>
}

const QueueItem = memo(({ item, onClick }: Props) => {
  const handleClick = () => {
    onClick?.(item)
  }

  const { handleContextMenu } = useQueueItemContextMenu(item)

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <DatabaseCoverArt
        className={styles.cover}
        fallbackIconClassName={styles.icon}
        file={item}
      />
      <div className={styles.name}>
        <span className={styles.title} title={item.title ?? ''}>
          {item.title}
        </span>
        <span className={styles.artist} title={item.artist ?? ''}>
          {item.artist}
        </span>
      </div>
      <div className={styles.info}>
        <Duration className={styles.duration} value={item.duration} />
        <span title={formatAudioFormatTitle(item.format)}>
          {formatAudioFormat(item.format)}
        </span>
      </div>
    </div>
  )
})

export default QueueItem
