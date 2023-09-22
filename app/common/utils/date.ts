const resetTime = (date: Date) => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
}

export const getToday = (): Date => {
  const result = new Date()

  resetTime(result)

  return result
}

export const getTomorrow = (): Date => {
  const result = getToday()

  result.setDate(result.getDate() + 1)

  return result
}
