import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistStore from '@app/playlist/stores/PlaylistStore'
import PlaybackStore from '@app/playback/stores/PlaybackStore'
interface Props {
  uri: string
}

const PlaylistReplaceButton: React.FC<Props> = ({ uri, children, ...props }) => {
  const handleClick = async () => {
    await PlaylistStore.clear()
    await PlaylistStore.add(uri)
    await PlaybackStore.toggle()
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children as JSX.TChildren[]}
    </Button>
  )
}

export default PlaylistReplaceButton
