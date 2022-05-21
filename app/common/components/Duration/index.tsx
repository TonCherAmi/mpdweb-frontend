import React from 'react'

import DurationData from '@app/common/data/Duration'

import { SIMPLE_DURATION_ZERO } from '@app/common/utils/duration'

import { formatDuration } from './utils'

interface Props {
  className?: string
  value: DurationData
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
