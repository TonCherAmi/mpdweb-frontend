import React from 'react'

import HistoryEntry from '@app/history/data/HistoryEntry'

import DatabaseCoverArt from '@app/database/components/DatabaseCoverArt'

import useDatabaseViewNavigation from '@app/database/views/DatabaseView/use/useDatabaseViewNavigation'

import { dirname } from '@app/common/utils/path'
import { formatDatabaseTags } from '@app/database/utils/format'

import { formatRecordedAtTime, formatSelectedDayDate } from './utils'

import styles from './styles.scss'

interface Props {
  selectedDay: Date
  items: ReadonlyArray<HistoryEntry>
}

const HistoryList = ({ selectedDay, items }: Props) => {
  const { goTo } = useDatabaseViewNavigation()

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        {formatSelectedDayDate(selectedDay)}
      </h3>
      <div className={styles.scrollwrap}>
        <div className={styles.entries}>
          <For of={items} body={(item) => {
            const tags = formatDatabaseTags(item.tags)

            return (
              <div key={item.id} className={styles.entry} onClick={() => goTo(dirname(item.uri))}>
                <DatabaseCoverArt className={styles.cover} fallbackIconClassName={styles.icon} uri={item.uri} />
                <div className={styles.tags}>
                  <span className={styles.title}>{tags.title}</span>
                  <span className={styles.artist}>{tags.artist}</span>
                </div>
                <span className={styles.date}>{formatRecordedAtTime(new Date(item.recordedAt))}</span>
              </div>
            )
          }} />
        </div>
      </div>
    </div>
  )
}

export default HistoryList
