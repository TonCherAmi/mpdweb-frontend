import React from 'react'

import cx from 'classnames'

import PlaybackOptionButton from '@app/playback/components/PlaybackOptionButton'

import useStatusContext from '@app/status/use/useStatusContext'

import PlaybackService from '@app/playback/services/PlaybackService'

import styles from './styles.scss'

const getTitleText = (state: string) => (
  `Single: ${state}`
)

const PlaybackSingleButton = () => {
  const status = useStatusContext()

  const handleClick = () => {
    PlaybackService.single()
  }

  const className = cx({
    [styles.on]: status.single === 'ON',
    [styles.oneshot]: status.single === 'ONESHOT'
  })

  return (
    <PlaybackOptionButton
      className={className}
      icon="DiceOne"
      title={getTitleText(status.single)}
      onClick={handleClick}
    />
  )
}

export default PlaybackSingleButton
