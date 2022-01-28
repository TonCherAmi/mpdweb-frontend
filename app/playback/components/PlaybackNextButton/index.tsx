import React from 'react'

import Button from '@app/common/components/Button'

import PlaybackService from '@app/playback/services/PlaybackService'

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick'>

const PlaybackNextButton = ({ children, ...props }: Props) => {
  const handleClick = () => PlaybackService.next()

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaybackNextButton
