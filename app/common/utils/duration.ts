import Duration from '@app/common/dto/Duration'
import SimpleDuration from '@app/common/dto/SimpleDuration'

export const SIMPLE_DURATION_ZERO: SimpleDuration = {
  hours: 0,
  minutes: 0,
  seconds: 0
}

export const DURATION_ZERO: Duration = {
  part: SIMPLE_DURATION_ZERO,
  total: SIMPLE_DURATION_ZERO
}
