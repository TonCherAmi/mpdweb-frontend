import * as R from 'ramda'

import HistoryEntry from '@app/history/data/HistoryEntry'

export const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const getNumberOfDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay()
}

const getDays = (year: number, month: number): ReadonlyArray<Nullable<number>> => {
  const nDaysInMonth = getNumberOfDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const realDays = R.times(R.inc, nDaysInMonth)
  const placeholderDays: ReadonlyArray<Nullable<number>> = R.repeat(null, firstDayOfMonth)

  return placeholderDays.concat(realDays)
}

export const getRows = (
  year: number,
  month: number,
): ReadonlyArray<ReadonlyArray<Nullable<number>>> => {
  const days = getDays(year, month)

  return R.times(R.identity, 6).map((i) => {
    return days.slice(i * 7, (i + 1) * 7)
  })
}

export const calculateIntensity = ({ min, max, data }: {
  min: number,
  max: number,
  data: ReadonlyArray<HistoryEntry>
}): number => {
  return Math.ceil((data.length / (max - min)) * 10)
}
