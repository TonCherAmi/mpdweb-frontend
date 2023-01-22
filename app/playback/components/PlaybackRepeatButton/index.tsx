import React from 'react'

import cx from 'classnames'

import PlaybackOptionButton from '@app/playback/components/PlaybackOptionButton'

import useStatusContext from '@app/status/use/useStatusContext'
import useStatefulQueueActions from '@app/queue/use/useStatefulQueueActions'

import styles from './styles.scss'

const getTitleText = (state: boolean) => (
  `Repeat: ${state ? 'on' : 'off'}`
)

const PlaybackRepeatButton = () => {
  const status = useStatusContext()

  const { toggleRepeat } = useStatefulQueueActions()

  return (
    <PlaybackOptionButton
      className={cx({ [styles.on]: status.repeat })}
      icon="Repeat"
      title={getTitleText(status.repeat)}
      onClick={toggleRepeat}
    />
  )
}

export default PlaybackRepeatButton
