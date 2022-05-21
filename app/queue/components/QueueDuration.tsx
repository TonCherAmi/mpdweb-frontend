import React from 'react'

import Status from '@app/status/data/Status'

import Duration from '@app/common/components/Duration'

import { DURATION_ZERO } from '@app/common/utils/duration'

interface Props {
  className?: string
  queue: Status['queue']
}

const QueueDuration = ({ className, queue }: Props) => {
  return (
    <span className={className}>
      <Duration value={queue?.elapsed ?? DURATION_ZERO} />
      {' '}
      /
      {' '}
      <Duration value={queue?.duration ?? DURATION_ZERO} />
    </span>
  )
}

export default QueueDuration
