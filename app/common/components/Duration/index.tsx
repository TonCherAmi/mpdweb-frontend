import React from 'react'

import DurationDto from '@app/common/dto/Duration'
import SimpleDuration from '@app/common/dto/SimpleDuration'

import { formatDuration } from './utils'

interface Props {
  className?: string
  value: Nullable<DurationDto>
}

const SIMPLE_DURATION_ZERO: SimpleDuration = {
  hours: 0,
  minutes: 0,
  seconds: 0
}

const Duration = ({ className, value }: Props) => {
  const formattedDuration = formatDuration(value?.part ?? SIMPLE_DURATION_ZERO)

  return (
    <span className={className}>
      {formattedDuration}
    </span>
  )
}

export default Duration
