import React from 'react'

import DurationDto from '@app/common/dto/Duration'

import { formatDuration } from './utils'

interface Props {
  className?: string
  value: DurationDto
}

  const formattedDuration = formatDuration(value.part)
const Duration = ({ className, value }: Props) => {

  return (
    <span className={className}>
      {formattedDuration}
    </span>
  )
}

export default Duration
