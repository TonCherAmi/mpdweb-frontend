import React from 'react'

import Button from '@app/common/components/Button'

import PlaybackStore from '@app/playback/stores/PlaybackStore'

const PlaybackToggleButton = ({ children, ...props }) => {
  const handleClick = () => PlaybackStore.toggle()

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaybackToggleButton
