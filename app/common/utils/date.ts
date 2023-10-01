export const resetTime = (date: Date): Date => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  return date
}

export const getToday = (): Date => {
  const result = new Date()

  return resetTime(result)
}

export const getTomorrow = (): Date => {
  const result = getToday()

  result.setDate(result.getDate() + 1)

  return result
}

export const getYesterday = (): Date => {
  const result = getToday()

  result.setDate(result.getDate() - 1)

  return result
}
