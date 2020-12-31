import React from 'react'

import Button from '@app/common/components/Button'

import PlaybackStore from '@app/playback/stores/PlaybackStore'

const PlaybackNextButton = ({ children, ...props }) => {
  const handleClick = () => PlaybackStore.next()

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaybackNextButton
