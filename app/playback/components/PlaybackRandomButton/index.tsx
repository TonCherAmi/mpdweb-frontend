import React from 'react'

import cx from 'classnames'

import PlaybackOptionButton from '@app/playback/components/PlaybackOptionButton'

import useStatusContext from '@app/status/use/useStatusContext'
import useStatefulQueueActions from '@app/queue/use/useStatefulQueueActions'

import styles from './styles.scss'

const getTitleText = (state: boolean) => (
  `Random: ${state ? 'on' : 'off'}`
)

const PlaybackRandomButton = () => {
  const status = useStatusContext()

  const { toggleRandom } = useStatefulQueueActions()

  return (
    <PlaybackOptionButton
      className={cx({ [styles.on]: status.random })}
      icon="Shuffle"
      title={getTitleText(status.random)}
      onClick={toggleRandom}
    />
  )
}

export default PlaybackRandomButton
