import React from 'react'

import cx from 'classnames'

import * as R from 'ramda'

import QueueDuration from '@app/queue/components/QueueDuration'
import QueuePosition from '@app/queue/components/QueuePosition'

import useStatusContext from '@app/status/use/useStatusContext'

import styles from './styles.scss'

interface Props {
  className?: string
}

const QueueInfo = ({ className }: Props) => {
  const status = useStatusContext()

  const currentPosition = R.isNil(status.song) ? 0 : status.song.position + 1

  return (
    <div className={cx(styles.container, className)}>
      <QueuePosition
        currentPosition={currentPosition}
        totalLength={status.queue.length}
      />
      <QueueDuration queue={status.queue} />
    </div>
  )
}

export default QueueInfo
