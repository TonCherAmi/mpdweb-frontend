import React from 'react'

import cx from 'classnames'

import PlaybackOptionButton from '@app/playback/components/PlaybackOptionButton'

import useStatusContext from '@app/status/use/useStatusContext'

import PlaybackService from '@app/playback/services/PlaybackService'

import styles from './styles.scss'

const getTitleText = (state: boolean) => (
  `Random: ${state ? 'ON' : 'OFF'}`
)

const PlaybackRandomButton = () => {
  const status = useStatusContext()

  const handleClick = () => {
    PlaybackService.random()
  }

  return (
    <PlaybackOptionButton
      className={cx({ [styles.on]: status.random } )}
      icon="Shuffle"
      title={getTitleText(status.random)}
      onClick={handleClick}
    />
  )
}

export default PlaybackRandomButton
