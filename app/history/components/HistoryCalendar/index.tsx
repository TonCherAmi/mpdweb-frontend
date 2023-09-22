import React, { useLayoutEffect } from 'react'

import * as R from 'ramda'

import HistoryEntry from '@app/history/data/HistoryEntry'
import HistoryMonth from '@app/history/components/HistoryMonth'

import useScrollable from '@app/common/use/useScrollable'

import { group, getMonths } from './utils'

import styles from './styles.scss'

interface Props {
  selectedDay: Date
  items: ReadonlyArray<HistoryEntry>
  onDayClick: (date: Date) => void
}

const HistoryCalendar = ({ selectedDay, items, onDayClick }: Props) => {
  const [containerRef, { scrollRight }] = useScrollable<HTMLDivElement>()

  useLayoutEffect(() => {
    scrollRight()
  }, [scrollRight])

  const groups = group(items)

  const nSongsListenedPerDay = R.values(groups).flatMap(R.values).map(R.length)

  const min = R.reduce(R.min<number>, 0, nSongsListenedPerDay)
  const max = R.reduce(R.max<number>, 0, nSongsListenedPerDay)

  const months = getMonths()

  return (
    <div ref={containerRef} className={styles.container}>
      <For of={months} body={([year, month]) => {
        const key = `${year}.${month}` as const

        return (
          <HistoryMonth
            key={key}
            min={min}
            max={max}
            year={year}
            month={month}
            data={groups[key]}
            selectedDay={selectedDay}
            onDayClick={onDayClick}
          />
        )
      }} />
    </div>
  )
}

export default HistoryCalendar
