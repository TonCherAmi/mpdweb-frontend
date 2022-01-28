import React from 'react'

import DurationDto from '@app/common/dto/Duration'

import { formatDuration } from './utils'

import styles from './styles.scss'

interface Props {
  className?: string
  value: DurationDto
}

const Duration = ({ className = styles.durationTest, value }: Props) => {
  const formattedDuration = formatDuration(value.part)

  return (
    <span className={className}>
      {formattedDuration}
    </span>
  )
}

export default Duration
