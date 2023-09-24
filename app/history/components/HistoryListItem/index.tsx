import React from 'react'

import HistoryEntry from '@app/history/data/HistoryEntry'

import DatabaseCoverArt from '@app/database/components/DatabaseCoverArt'

import useDatabaseCoverArtModal from '@app/database/use/useDatabaseCoverArtModal'
import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'

import { dirname } from '@app/common/utils/path'
import { formatDatabaseTags } from '@app/database/utils/format'

import { formatRecordedAtTime } from './utils'

import styles from './styles.scss'

interface Props {
  item: HistoryEntry
}

const HistoryListItem = ({ item }: Props) => {
  const { goTo } = useDatabaseViewNavigation()

  const { open: openCoverArtModal } = useDatabaseCoverArtModal(item.uri)

  const handleClick = () => {
    goTo(dirname(item.uri))
  }

  const handleCoverArtClick: React.MouseEventHandler = (e) => {
    e.stopPropagation()

    openCoverArtModal()
  }

  const tags = formatDatabaseTags(item.tags)

  return (
    <div
      key={item.id}
      className={styles.container}
      onClick={handleClick}
    >
      <DatabaseCoverArt
        className={styles.cover}
        fallbackIconClassName={styles.icon}
        uri={item.uri}
        onClick={handleCoverArtClick}
      />
      <div className={styles.text}>
        <div className={styles.tags}>
          <span className={styles.title}>{tags.title}</span>
          <span className={styles.artist}>{tags.artist}</span>
        </div>
        <span className={styles.date}>{formatRecordedAtTime(new Date(item.recordedAt))}</span>
      </div>
    </div>
  )
}

export default HistoryListItem
