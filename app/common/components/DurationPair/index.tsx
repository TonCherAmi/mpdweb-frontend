import React from 'react'

import { default as DurationDto } from '@app/common/dto/Duration'

import Duration from '@app/common/components/Duration'

interface DurationPairProps {
  className?: string,
  first: DurationDto,
  second: DurationDto
}

const DurationPair = ({ className, first, second }: DurationPairProps) => (
  <span className={className}>
    <Duration value={first} /> / <Duration value={second} />
  </span>
)

export default DurationPair
