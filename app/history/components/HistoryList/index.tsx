import React from 'react'

import HistoryEntry from '@app/history/data/HistoryEntry'

import HistoryListItem from '@app/history/components/HistoryListItem'

import { formatSelectedDayDate } from './utils'

import styles from './styles.scss'

interface Props {
  selectedDay: Date
  items: ReadonlyArray<HistoryEntry>
}

const HistoryList = ({ selectedDay, items }: Props) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        {formatSelectedDayDate(selectedDay)}
      </h3>
      <div className={styles.scrollwrap}>
        <div className={styles.entries}>
          <For of={items} body={(item) => (
            <HistoryListItem key={item.id} item={item} />
          )} />
        </div>
      </div>
    </div>
  )
}

export default HistoryList
