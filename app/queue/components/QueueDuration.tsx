import React from 'react'

import Status from '@app/status/data/Status'

import Duration from '@app/common/components/Duration'

interface Props {
  className?: string
  queue: Status['queue']
}

const QueueDuration = ({ className, queue }: Props) => {
  return (
    <span className={className}>
      <Duration value={queue?.elapsed} />
      {' '}
      /
      {' '}
      <Duration value={queue?.duration} />
    </span>
  )
}

export default QueueDuration
