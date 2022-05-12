import React from 'react'

import cx from 'classnames'

import PlaybackOptionButton from '@app/playback/components/PlaybackOptionButton'

import useStatusContext from '@app/status/use/useStatusContext'

import PlaybackService from '@app/playback/services/PlaybackService'

import styles from './styles.scss'

const getTitleText = (state: boolean) => (
  `Repeat: ${state ? 'ON' : 'OFF'}`
)

const PlaybackRepeatButton = () => {
  const status = useStatusContext()

  const handleClick = () => {
    PlaybackService.repeat()
  }

  return (
    <PlaybackOptionButton
      className={cx({ [styles.on]: status.repeat } )}
      icon="Repeat"
      title={getTitleText(status.repeat)}
      onClick={handleClick}
    />
  )
}

export default PlaybackRepeatButton
