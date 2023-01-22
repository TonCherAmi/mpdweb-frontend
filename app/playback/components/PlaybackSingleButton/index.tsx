import React from 'react'

import cx from 'classnames'

import PlaybackOptionButton from '@app/playback/components/PlaybackOptionButton'

import useStatusContext from '@app/status/use/useStatusContext'
import useStatefulQueueActions from '@app/queue/use/useStatefulQueueActions'

import styles from './styles.scss'

const getTitleText = (state: string) => (
  `Single: ${state}`
)

const PlaybackSingleButton = () => {
  const status = useStatusContext()

  const { cycleSingle } = useStatefulQueueActions()

  const className = cx({
    [styles.on]: status.single === 'on',
    [styles.oneshot]: status.single === 'oneshot',
  })

  return (
    <PlaybackOptionButton
      className={className}
      icon="DiceOne"
      title={getTitleText(status.single)}
      onClick={cycleSingle}
    />
  )
}

export default PlaybackSingleButton
