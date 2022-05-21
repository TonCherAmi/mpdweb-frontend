import React from 'react'

import * as R from 'ramda'

import DurationData from '@app/common/data/Duration'

import { formatDurationColon, formatDurationDescriptive } from './utils'

interface Props {
  className?: string
  value: DurationData
  format?: 'colon' | 'descriptive'
}

const formatters = {
  'colon': formatDurationColon,
  'descriptive': formatDurationDescriptive
} as const

const Duration = ({ className, value, format = 'colon' }: Props) => {
  const formattedDuration = formatters[format](value.part)

  if (R.isNil(formattedDuration)) {
    return null
  }

  return (
    <span className={className}>
      {formattedDuration}
    </span>
  )
}

export default Duration
