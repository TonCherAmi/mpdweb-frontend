import React from 'react'

import Button from '@app/common/components/Button'

import PlaybackService from '@app/playback/services/PlaybackService'

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick'>

const PlaybackStopButton = ({ children, ...props }: Props) => {
  const handleClick = () => PlaybackService.stop()

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaybackStopButton
