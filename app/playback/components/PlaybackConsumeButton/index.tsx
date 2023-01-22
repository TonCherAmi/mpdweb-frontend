import React from 'react'

import cx from 'classnames'

import PlaybackOptionButton from '@app/playback/components/PlaybackOptionButton'

import useStatusContext from '@app/status/use/useStatusContext'
import useStatefulQueueActions from '@app/queue/use/useStatefulQueueActions'

import styles from './styles.scss'

const getTitleText = (state: string) => (
  `Consume: ${state}`
)

const PlaybackConsumeButton = () => {
  const status = useStatusContext()

  const { cycleConsume } = useStatefulQueueActions()

  const className = cx({
    [styles.on]: status.consume === 'on',
    [styles.oneshot]: status.consume === 'oneshot',
  })

  return (
    <PlaybackOptionButton
      className={className}
      icon="CookieBite"
      title={getTitleText(status.consume)}
      onClick={cycleConsume}
    />
  )
}

export default PlaybackConsumeButton
