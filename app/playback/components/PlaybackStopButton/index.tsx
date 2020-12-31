import React from 'react'

import Button from '@app/common/components/Button'

import PlaybackStore from '@app/playback/stores/PlaybackStore'

const PlaybackStopButton = ({ children, ...props }) => {
  const handleClick = () => PlaybackStore.stop()

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaybackStopButton
