import React from 'react'

import Button from '@app/common/components/Button'

import PlaybackStore from '@app/playback/stores/PlaybackStore'

  const handleClick = () => PlaybackStore.stop()
const PlaybackStopButton: React.FC<UnknownRecord> = ({ children, ...props }) => {

  return (
    <Button {...props} onClick={handleClick}>
      {children as JSX.TChildren[]}
    </Button>
  )
}

export default PlaybackStopButton
