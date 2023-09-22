import * as R from 'ramda'

import HistoryEntry from '@app/history/data/HistoryEntry'

export const getMonths = (): ReadonlyArray<[number, number]> => {
  const now = new Date()

  const result: Array<[number, number]> = []

  for (let i = 0; i < 14; i++) {
    result.push([now.getFullYear(), now.getMonth()])

    now.setMonth(now.getMonth() - 1)
  }

  return result.reverse()
}

export type HistoryEntriesGroupedByDay = Record<
  `${number}.${number}.${number}`,
  ReadonlyArray<HistoryEntry>
>

/**
 * History entries grouped by day grouped by year and month.
 */
export type HistoryEntryGroupsGroupedByMonth = Record<
  `${number}.${number}`,
  HistoryEntriesGroupedByDay
>

export const group = (data: ReadonlyArray<HistoryEntry>): HistoryEntryGroupsGroupedByMonth => {
  const byYearAndMonth = R.groupBy((entry) => {
    const date = new Date(entry.recordedAt)

    return `${date.getFullYear()}.${date.getMonth()}`
  }, data)

  return R.mapObjIndexed((entries) => {
    return R.groupBy((entry) => {
      const date = new Date(entry.recordedAt)

      return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
    }, entries)
  }, byYearAndMonth)
}
