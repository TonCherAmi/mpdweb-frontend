import Duration from '@app/common/data/Duration'
import SimpleDuration from '@app/common/data/SimpleDuration'

export const SIMPLE_DURATION_ZERO: SimpleDuration = {
  hours: 0,
  minutes: 0,
  seconds: 0
}

export const DURATION_ZERO: Duration = {
  part: SIMPLE_DURATION_ZERO,
  total: SIMPLE_DURATION_ZERO
}

const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR

export const addDuration = (durationA: Duration, durationB: Duration): Duration => {
  return totalSecondsToDuration(
    durationA.total.seconds + durationB.total.seconds
  )
}

export const totalSecondsToDuration = (totalSeconds: number): Duration => {
  return {
    total: {
      hours: Math.floor(totalSeconds / SECONDS_PER_HOUR),
      minutes: Math.floor(totalSeconds / SECONDS_PER_MINUTE),
      seconds: Math.floor(totalSeconds)
    },
    part: {
      hours: Math.floor(totalSeconds / SECONDS_PER_HOUR),
      minutes: Math.floor(totalSeconds / SECONDS_PER_MINUTE) % MINUTES_PER_HOUR,
      seconds: Math.floor(totalSeconds % SECONDS_PER_MINUTE)
    }
  }
}
