import React from 'react'

import Button from '@app/common/components/Button'

import PlaylistStore from '@app/playlist/stores/PlaylistStore'

const PlaylistAddButton = ({ uri, children, ...props }) => {
  const handleClick = () => PlaylistStore.add(uri)

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default PlaylistAddButton
