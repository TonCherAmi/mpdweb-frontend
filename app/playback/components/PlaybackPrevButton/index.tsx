import React from 'react'

import Button from '@app/common/components/Button'

import PlaybackService from '@app/playback/services/PlaybackService'

const PlaybackPrevButton: React.FC<UnknownRecord> = ({ children, ...props }) => {
  const handleClick = () => PlaybackService.next()

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaybackPrevButton
