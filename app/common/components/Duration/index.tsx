import React from 'react'

import * as R from 'ramda'

import { default as DurationDto } from '@app/common/dto/Duration'

import styles from './styles.scss'

const propToString = (name: string) => R.pipe(
  R.prop(name),
  R.toString
)

const padDurationValue = (value: string): string => {
  return value.padStart(2, '0')
}

const formatHours: (duration: DurationDto) => string = R.ifElse(
  R.propEq('hours', 0),
  R.always(''),
  propToString('hours')
)

const formatMinutes: (duration: DurationDto) => string = R.pipe(
  R.ifElse(
    R.propEq('hours', 0),
    propToString('minutes'),
    R.pipe(propToString('minutes'), padDurationValue)
  ),
)

const formatSeconds: (duration: DurationDto) => string = R.pipe(
  R.prop('seconds'),
  R.toString,
  padDurationValue
)

const formatDuration = (duration: DurationDto): string => {
  const format = R.pipe(
    R.map(R.applyTo(duration)),
    R.reject(R.isEmpty),
    R.join(':')
  )

  return format([formatHours, formatMinutes, formatSeconds])
}

interface DurationProps {
  className?: string
  value: DurationDto
}

const Duration = ({ className = styles.durationTest, value }: DurationProps) => {
  const formattedDuration = formatDuration(value)

  return (
    <span className={className}>
      {formattedDuration}
    </span>
  )
}

export default Duration
