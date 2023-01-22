import React from 'react'

import cx from 'classnames'

import * as R from 'ramda'

import QueueDuration from '@app/queue/components/QueueDuration'
import QueuePosition from '@app/queue/components/QueuePosition'

import useQueueContext from '@app/queue/use/useQueueContext'
import useStatusContext from '@app/status/use/useStatusContext'
import useCurrentSongElapsedContext from '@app/status/use/useCurrentSongElapsedContext'

import styles from './styles.scss'

interface Props {
  className?: string
}

const QueueInfo = ({ className }: Props) => {
  const status = useStatusContext()
  const queue = useQueueContext()
  const currentSongElapsed = useCurrentSongElapsedContext()

  const currentPosition = R.isNil(status.song) ? 0 : status.song.position + 1

  return (
    <div className={cx(styles.container, className)}>
      <QueuePosition
        currentPosition={currentPosition}
        totalLength={status.queue.length}
      />
      <QueueDuration status={status} queue={queue} currentSongElapsed={currentSongElapsed} />
    </div>
  )
}

export default QueueInfo
