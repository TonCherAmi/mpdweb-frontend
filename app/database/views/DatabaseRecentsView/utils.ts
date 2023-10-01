import * as R from 'ramda'

import DatabaseFile from '@app/database/data/DatabaseFile'

import { resetTime, getToday, getYesterday } from '@app/common/utils/date'

export const groupByDate = (items: ReadonlyArray<DatabaseFile>): Record<string, ReadonlyArray<DatabaseFile>> => {
  return R.groupBy((item) => {
    const updatedAt = new Date(item.updatedAt)

    return resetTime(updatedAt).toISOString()
  }, items)
}

export const sortGroup = (items: ReadonlyArray<DatabaseFile>): ReadonlyArray<DatabaseFile> => {
  const grouped = R.groupBy((item) => {
    const updatedAt = new Date(item.updatedAt)

    updatedAt.setMinutes(0)
    updatedAt.setSeconds(0)
    updatedAt.setMilliseconds(0)

    return updatedAt.toISOString()
  }, items)

  return R.toPairs(grouped)
    .flatMap(([, items]) => R.sortBy(R.prop('uri'), items))
}

export const formatGroupHeading = (date: Date): string => {
  if (date.getTime() === getToday().getTime()) {
    return 'Today'
  }

  if (date.getTime() === getYesterday().getTime()) {
    return 'Yesterday'
  }

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  })
}
