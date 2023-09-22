import React from 'react'

import cx from 'classnames'

import * as R from 'ramda'

import Handler from '@app/common/types/Handler'

import { getToday } from '@app/common/utils/date'

import { HistoryEntriesGroupedByDay } from '@app/history/components/HistoryCalendar/utils'

import { MONTH_NAMES, getRows, calculateIntensity } from './utils'

import styles from './styles.scss'

const NUMBER_OF_DAYS_IN_WEEK = 7

interface Props {
  min: number
  max: number
  year: number
  month: number
  data: Nullable<HistoryEntriesGroupedByDay>
  selectedDay: Date
  onDayClick: Handler<Date>
}

const HistoryMonth = (props: Props) => {
  const rows = getRows(props.year, props.month)

  const today = getToday()

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.month}>
          <th colSpan={NUMBER_OF_DAYS_IN_WEEK}>
            {MONTH_NAMES[props.month]}
          </th>
        </tr>
        <tr className={styles.week}>
          <th>S</th>
          <th>M</th>
          <th>T</th>
          <th>W</th>
          <th>T</th>
          <th>F</th>
          <th>S</th>
        </tr>
      </thead>
      <tbody>
        <For of={rows} body={(row, i) => {
          return (
            <tr key={i}>
              <For of={row} body={(day, j) => {
                const date = day && new Date(props.year, props.month, day)

                const key = day && `${props.year}.${props.month}.${day}` as const

                const data = key && props.data?.[key]

                const intensity = data && calculateIntensity({
                  data,
                  min: props.min,
                  max: props.max,
                })

                const className = cx(styles.day, {
                  [styles.empty]: R.isNil(day),
                  [styles.future]: date && date > today,
                  [styles.selected]: date && date?.getTime() === props.selectedDay?.getTime(),
                  [styles[`intensity${intensity}`]]: !R.isNil(intensity),
                })

                const optionalProps = date && {
                  title: date.toLocaleDateString(),
                  onClick: () => props.onDayClick(date),
                }

                return (
                  <td
                    key={`${key}.${j}`}
                    className={className}
                    {...optionalProps}
                  />
                )
              }} />
            </tr>
          )
        }} />
      </tbody>
    </table>
  )
}

export default HistoryMonth
