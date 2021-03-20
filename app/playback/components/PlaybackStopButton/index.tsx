import React from 'react'

import Button from '@app/common/components/Button'

import PlaybackService from '@app/playback/services/PlaybackService'

const PlaybackStopButton: React.FC<UnknownRecord> = ({ children, ...props }) => {
  const handleClick = () => PlaybackService.stop()

  return (
    <Button {...props} onClick={handleClick}>
      {children as JSX.TChildren[]}
    </Button>
  )
}

export default PlaybackStopButton
