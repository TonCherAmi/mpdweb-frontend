import React from 'react'

import cx from 'classnames'

import PlaybackOptionButton from '@app/playback/components/PlaybackOptionButton'

import useStatusContext from '@app/status/use/useStatusContext'

import PlaybackService from '@app/playback/services/PlaybackService'

import styles from './styles.scss'

const getTitleText = (state: boolean) => (
  `Consume: ${state ? 'ON' : 'OFF'}`
)

const PlaybackConsumeButton = () => {
  const status = useStatusContext()

  const handleClick = () => {
    PlaybackService.consume()
  }

  return (
    <PlaybackOptionButton
      className={cx({ [styles.on]: status.consume })}
      icon="CookieBite"
      title={getTitleText(status.consume)}
      onClick={handleClick}
    />
  )
}

export default PlaybackConsumeButton
