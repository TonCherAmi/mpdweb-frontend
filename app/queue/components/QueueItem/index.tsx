import React, { memo, forwardRef } from 'react'

import cx from 'classnames'

import Handler from '@app/common/types/Handler'
import QueueItemData from '@app/queue/data/QueueItem'

import Duration from '@app/common/components/Duration'
import DatabaseCoverArt from '@app/database/components/DatabaseCoverArt'

import useQueueItemContextMenu from '@app/queue/use/useQueueItemContextMenu'
import useDatabaseCoverArtModal from '@app/database/use/useDatabaseCoverArtModal'

import { getOrPlaceholder } from '@app/common/utils/format'
import {
  formatDatabaseTags,
  formatDatabaseAudioFormat,
  formatDatabaseAudioFormatMultiline,
} from '@app/database/utils/format'

import styles from './styles.scss'

interface Props {
  isFocused: boolean
  item: QueueItemData
  onClick?: Handler<QueueItemData>
}

const QueueItem = memo(
  forwardRef<HTMLDivElement, Props>(({ isFocused, item, onClick }, ref) => {
    const { open: openCoverArtModal } = useDatabaseCoverArtModal(item.uri)

    const handleClick = () => {
      onClick?.(item)
    }

    const handleCoverArtClick: React.MouseEventHandler = (e) => {
      e.stopPropagation()

      openCoverArtModal()
    }

    const { handleContextMenu } = useQueueItemContextMenu(item)

    const tags = formatDatabaseTags(item.tags)

    return (
      <div
        ref={ref}
        className={cx(styles.container, { [styles.focused]: isFocused })}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      >
        <DatabaseCoverArt
          className={styles.cover}
          fallbackIconClassName={styles.icon}
          uri={item.uri}
          onClick={handleCoverArtClick}
        />
        <div className={styles.name}>
        <span className={styles.title} title={getOrPlaceholder(tags.title)}>
          {getOrPlaceholder(tags.title)}
        </span>
          <span className={styles.artist} title={getOrPlaceholder(tags.artist)}>
          {getOrPlaceholder(tags.artist)}
        </span>
        </div>
        <div className={styles.info}>
          <Duration className={styles.duration} value={item.duration} />
          <span className={styles.format} title={formatDatabaseAudioFormatMultiline(item.format)}>
            {formatDatabaseAudioFormat(item.format)}
          </span>
        </div>
      </div>
    )
  })
)

export default QueueItem
