import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistService from '@app/playlist/services/PlaylistService'
import PlaybackService from '@app/playback/services/PlaybackService'

interface Props extends React.ComponentProps<typeof Button> {
  uri: string
}

const PlaylistReplaceButton = ({ uri, children, ...props }: Props) => {
  const handleClick = async () => {
    await PlaylistService.clear()
    await PlaylistService.add(uri)
    await PlaybackService.toggle()
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaylistReplaceButton
