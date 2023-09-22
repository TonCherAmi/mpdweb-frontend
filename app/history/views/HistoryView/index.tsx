import React, { useEffect, useCallback, useState } from 'react'

import HistoryList from '@app/history/components/HistoryList'
import HistoryCalendar from '@app/history/components/HistoryCalendar'

import useRemoteList from '@app/common/use/useRemoteList'

import { getTomorrow, getToday } from '@app/common/utils/date'

import HistoryApi from '@app/history/api'

import route from './route'

import styles from './styles.scss'

const HistoryView = () => {
  const {
    items: yearlyHistory,
    load: loadYearlyHistory,
  } = useRemoteList(HistoryApi.get)

  const {
    items: dailyHistory,
    load: loadDailyHistory,
  } = useRemoteList(HistoryApi.get)

  const [selectedDay, setSelectedDay] = useState(getToday())

  useEffect(() => {
    const from = new Date()
    const to = new Date()

    from.setFullYear(from.getFullYear() - 1)

    loadYearlyHistory({ from: from.toISOString(), to: to.toISOString() })

    loadDailyHistory({ from: getToday().toISOString(), to: getTomorrow().toISOString() })
  }, [loadDailyHistory, loadYearlyHistory])

  const handleDayClick = useCallback((from: Date) => {
    const to = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1)

    setSelectedDay(from)

    loadDailyHistory({ from: from.toISOString(), to: to.toISOString() })
  }, [loadDailyHistory])

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Listening History
      </h1>
      <HistoryCalendar
        selectedDay={selectedDay}
        items={yearlyHistory}
        onDayClick={handleDayClick}
      />
      <HistoryList selectedDay={selectedDay} items={dailyHistory} />
    </div>
  )
}

export { route }

export default HistoryView
