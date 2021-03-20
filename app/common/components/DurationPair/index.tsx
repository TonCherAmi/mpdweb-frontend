import React from 'react'

import DurationDto from '@app/common/dto/Duration'

import Duration from '@app/common/components/Duration'

interface Props {
  className?: string
  first: DurationDto
  second: DurationDto
}

const DurationPair: React.FC<Props> = ({ className, first, second }) => (
  <span className={className}>
    <Duration value={first} /> / <Duration value={second} />
  </span>
)

export default DurationPair
