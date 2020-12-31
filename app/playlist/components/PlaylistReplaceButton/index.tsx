import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistStore from '@app/playlist/stores/PlaylistStore'
import PlaybackStore from '@app/playback/stores/PlaybackStore'

const PlaylistReplaceButton = ({ uri, children, ...props }) => {
  const handleClick = async () => {
    await PlaylistStore.clear()
    await PlaylistStore.add(uri)
    await PlaybackStore.toggle()
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaylistReplaceButton
