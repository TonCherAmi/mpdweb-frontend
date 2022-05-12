import React from 'react'

import DurationDto from '@app/common/dto/Duration'

import { SIMPLE_DURATION_ZERO } from '@app/common/utils/duration'

import { formatDuration } from './utils'

interface Props {
  className?: string
  value: Nullable<DurationDto>
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
