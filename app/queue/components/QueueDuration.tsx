import React from 'react'

import * as R from 'ramda'

import Status from '@app/status/data/Status'
import QueueItem from '@app/queue/data/QueueItem'
import DurationData from '@app/common/data/Duration'

import Duration from '@app/common/components/Duration'

import { DURATION_ZERO, addDuration, totalSecondsToDuration } from '@app/common/utils/duration'

const sumDuration = (queue: ReadonlyArray<QueueItem>): DurationData => {
  return queue.reduce((acc, { duration }) => (
    addDuration(acc, duration)
  ), DURATION_ZERO)
}

const calculateElapsed = (
  status: Status,
  queue: ReadonlyArray<QueueItem>,
  currentSongElapsed: number,
): DurationData => {
  const currentSong = status.song

  if (R.isNil(currentSong)) {
    return DURATION_ZERO
  }

  const elapsedBeforeCurrentSong = R.pipe(
    R.takeWhile(({ position }: QueueItem) => position < currentSong.position),
    sumDuration,
  )

  return addDuration(totalSecondsToDuration(currentSongElapsed), elapsedBeforeCurrentSong(queue))
}

interface Props {
  className?: string
  status: Status
  queue: ReadonlyArray<QueueItem>
  currentSongElapsed: number
}

const QueueDuration = ({ className, status, queue, currentSongElapsed }: Props) => {
  return (
    <span className={className}>
      <Duration value={calculateElapsed(status, queue, currentSongElapsed)} />
      {' '}
      /
      {' '}
      <Duration value={sumDuration(queue)} />
    </span>
  )
}

export default QueueDuration
