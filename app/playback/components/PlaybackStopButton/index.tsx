import React from 'react'

import Button from '@app/common/components/Button'

import usePlaybackActions from '@app/playback/use/usePlaybackActions'

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick'>

const PlaybackStopButton = ({ children, ...props }: Props) => {
  const { stop } = usePlaybackActions()

  return (
    <Button {...props} onClick={stop}>
      {children}
    </Button>
  )
}

export default PlaybackStopButton
