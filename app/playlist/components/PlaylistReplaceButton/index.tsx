import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistService from '@app/playlist/services/PlaylistService'
import PlaybackService from '@app/playback/services/PlaybackService'

interface Props {
  uri: string
}

const PlaylistReplaceButton: React.FC<Props> = ({ uri, children, ...props }) => {
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
